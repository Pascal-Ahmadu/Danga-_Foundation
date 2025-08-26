// app/api/newsletter/route.ts

import { NextRequest, NextResponse } from "next/server";

interface MailchimpError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

interface MailchimpMember {
  id: string;
  email_address: string;
  unique_email_id: string;
  contact_id: string;
  full_name: string;
  web_id: number;
  email_type: string;
  status: string;
  unsubscribe_reason: string;
  consents_to_one_to_one_messaging: boolean;
  merge_fields: Record<string, any>;
  interests: Record<string, boolean>;
  stats: {
    avg_open_rate: number;
    avg_click_rate: number;
    ecommerce_data: {
      total_revenue: number;
      number_of_orders: number;
      currency_code: string;
    };
  };
  ip_signup: string;
  timestamp_signup: string;
  ip_opt: string;
  timestamp_opt: string;
  member_rating: number;
  last_changed: string;
  language: string;
  vip: boolean;
  email_client: string;
  location: {
    latitude: number;
    longitude: number;
    gmtoff: number;
    dstoff: number;
    country_code: string;
    timezone: string;
    region: string;
  };
  marketing_permissions: Array<{
    marketing_permission_id: string;
    text: string;
    enabled: boolean;
  }>;
  last_note: {
    note_id: number;
    created_at: string;
    created_by: string;
    note: string;
  };
  source: string;
  tags_count: number;
  tags: Array<{
    id: number;
    name: string;
  }>;
  list_id: string;
  _links: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema: string;
    schema: string;
  }>;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize email
function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  console.log("📧 Newsletter subscription API called");
  
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { email } = body;
    console.log("📨 Received subscription request for:", email);

    // Validate email presence
    if (!email) {
      console.log("❌ No email provided");
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Sanitize and validate email format
    const sanitizedEmail = sanitizeEmail(email);
    if (!isValidEmail(sanitizedEmail)) {
      console.log("❌ Invalid email format:", sanitizedEmail);
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check environment variables
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!API_KEY) {
      console.error("❌ MAILCHIMP_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error: Missing API key" },
        { status: 500 }
      );
    }

    if (!AUDIENCE_ID) {
      console.error("❌ MAILCHIMP_AUDIENCE_ID environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error: Missing audience ID" },
        { status: 500 }
      );
    }

    // Extract datacenter from API key
    const datacenter = API_KEY.split("-")[1];
    if (!datacenter) {
      console.error("❌ Invalid Mailchimp API key format");
      return NextResponse.json(
        { error: "Server configuration error: Invalid API key format" },
        { status: 500 }
      );
    }

    console.log("🔑 Using datacenter:", datacenter);

    // Prepare Mailchimp API request
    const mailchimpUrl = `https://${datacenter}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
    const requestBody = {
      email_address: sanitizedEmail,
      status: "subscribed", // Change to "pending" if you want double opt-in
      merge_fields: {
        FNAME: "", // You can add first name if you collect it
        LNAME: "", // You can add last name if you collect it
      },
      tags: ["Website Signup"], // Optional: tag subscribers from website
    };

    console.log("📤 Making request to Mailchimp API...");
    console.log("🎯 URL:", mailchimpUrl);

    // Make request to Mailchimp
    const mailchimpResponse = await fetch(mailchimpUrl, {
      method: "POST",
      headers: {
        "Authorization": `apikey ${API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "Danga Memorial Foundation Newsletter/1.0",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📨 Mailchimp response status:", mailchimpResponse.status);

    // Parse Mailchimp response
    const mailchimpData = await mailchimpResponse.json();
    console.log("📨 Mailchimp response data:", JSON.stringify(mailchimpData, null, 2));

    // Handle successful subscription
    if (mailchimpResponse.ok) {
      const memberData = mailchimpData as MailchimpMember;
      console.log("✅ Successfully subscribed:", memberData.email_address);
      
      return NextResponse.json({
        message: "Successfully subscribed to newsletter!",
        status: memberData.status,
      });
    }

    // Handle Mailchimp errors
    const errorData = mailchimpData as MailchimpError;
    console.log("❌ Mailchimp API error:", errorData);

    // Handle specific error cases
    switch (mailchimpResponse.status) {
      case 400:
        if (errorData.title === "Member Exists") {
          console.log("ℹ️ User already subscribed:", sanitizedEmail);
          return NextResponse.json(
            { error: "You're already subscribed to our newsletter!" },
            { status: 400 }
          );
        }
        
        if (errorData.title === "Invalid Resource") {
          console.log("ℹ️ Invalid email or other resource issue");
          return NextResponse.json(
            { error: "Please check your email address and try again." },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: errorData.detail || "Invalid subscription request" },
          { status: 400 }
        );

      case 401:
        console.error("❌ Mailchimp API authentication failed");
        return NextResponse.json(
          { error: "Server configuration error: Authentication failed" },
          { status: 500 }
        );

      case 404:
        console.error("❌ Mailchimp audience not found");
        return NextResponse.json(
          { error: "Server configuration error: Audience not found" },
          { status: 500 }
        );

      case 429:
        console.error("❌ Mailchimp API rate limit exceeded");
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );

      default:
        console.error("❌ Unexpected Mailchimp API error:", mailchimpResponse.status);
        return NextResponse.json(
          { error: errorData.detail || "Subscription failed. Please try again." },
          { status: mailchimpResponse.status }
        );
    }

  } catch (error) {
    console.error("❌ Newsletter API error:", error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { error: "Unable to connect to subscription service. Please try again." },
        { status: 503 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to subscribe." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to subscribe." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to subscribe." },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to subscribe." },
    { status: 405 }
  );
}