import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'school', 'level', 'phone', 'email', 'motivation', 'expectations'];
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if at least 4 dates are selected
    if (!applicationData.selectedDates || applicationData.selectedDates.length < 4) {
      return NextResponse.json(
        { error: 'Please select at least 4 available dates' },
        { status: 400 }
      );
    }

    // Check if team preference is selected
    if (!applicationData.teamPreference) {
      return NextResponse.json(
        { error: 'Please select a team preference' },
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;

    if (!airtableApiKey || !airtableBaseId) {
      return NextResponse.json(
        { error: 'Application service is currently unavailable' },
        { status: 500 }
      );
    }

    // Prepare data for Airtable
    const airtableData = {
      records: [
        {
          fields: {
            "Name": applicationData.name,
            "School": applicationData.school === "Other" ? applicationData.otherSchool : applicationData.school,
            "Level": applicationData.level,
            "Phone": applicationData.phone,
            "Email": applicationData.email,
            "Motivation": applicationData.motivation,
            "Expectations": applicationData.expectations,
            "Screening Experience": applicationData.screeningExperience,
            "Counseling Experience": applicationData.counselingExperience,
            "Available Dates": applicationData.selectedDates.join(", "),
            "Team Preference": applicationData.teamPreference,
            "Backup Volunteer": applicationData.isBackupVolunteer ? "Yes" : "No",
            "Clinical Experience": applicationData.clinicalExperience || "",
            "Application Date": new Date().toISOString().split('T')[0],
            "Status": "New Application"
          }
        }
      ]
    };

    // Try different table name formats
    const possibleTableNames = [
      'Volunteer Applications',
      'Table 1',
      'tblVolunteerApplications'
    ];

    let airtableResponse;
    let lastError;

    for (const tableName of possibleTableNames) {
      try {
        const encodedTableName = encodeURIComponent(tableName);
        const url = `https://api.airtable.com/v0/${airtableBaseId}/${encodedTableName}`;
        

        airtableResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(airtableData)
        });

        if (airtableResponse.ok) {
          break;
        } else {
          const errorData = await airtableResponse.json();
          lastError = errorData;
        }
      } catch (error) {
        lastError = error;
      }
    }

    if (!airtableResponse || !airtableResponse.ok) {
      
      return NextResponse.json(
        { 
          error: 'Failed to submit application. Please check your Airtable setup.',
          debug: process.env.NODE_ENV === 'development' ? {
            baseId: airtableBaseId,
            lastError: lastError
          } : undefined
        },
        { status: 500 }
      );
    }

    const result = await airtableResponse.json();
    
    return NextResponse.json(
      { 
        message: 'Application submitted successfully!',
        recordId: result.records[0].id
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
} 