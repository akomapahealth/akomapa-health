import { NextRequest, NextResponse } from 'next/server';
import MailerLite from '@mailerlite/mailerlite-nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
    //   console.error('MailerLite API key not found');
      return NextResponse.json(
        { error: 'Newsletter service is currently unavailable' },
        { status: 500 }
      );
    }

    // Initialize MailerLite SDK
    const mailerlite = new MailerLite({
      api_key: apiKey,
    });

    // Create/upsert subscriber using the SDK
    const response = await mailerlite.subscribers.createOrUpdate({
      email: email,
      status: 'active'
    });

    // Handle the response safely with type checking
    const subscriberData = (response as unknown as { data?: { email?: string; status?: string } })?.data;
    
    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        subscriber: {
          email: subscriberData?.email || email,
          status: subscriberData?.status || 'active'
        }
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    // console.error('Newsletter subscription error:', error);
    
    // Handle specific MailerLite SDK errors
    const errorObj = error as { status?: number; response?: { status?: number } };
    if (errorObj?.status === 422 || errorObj?.response?.status === 422) {
      return NextResponse.json(
        { error: 'This email is already subscribed or invalid' },
        { status: 400 }
      );
    }
    
    if (errorObj?.status === 429 || errorObj?.response?.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    if (errorObj?.status === 401 || errorObj?.response?.status === 401) {
      return NextResponse.json(
        { error: 'Newsletter service is currently unavailable' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
} 