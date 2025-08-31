// app/api/send-scholarship-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { applicantEmail, applicantName, referenceId, formData } = await request.json();

    // Email to the applicant (confirmation)
    const applicantEmailData = {
      from: 'Danga Memorial Foundation <noreply@danga.org>',
      to: [applicantEmail],
      subject: `Scholarship Application Received - ${referenceId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Scholarship Application Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Danga Memorial Foundation</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Scholarship Application Confirmation</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Dear ${applicantName},</h2>
            
            <p>Thank you for submitting your scholarship application to the Danga Memorial Foundation. We have successfully received your application and it is now under review.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #667eea; margin-top: 0;">Application Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Reference ID:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${referenceId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.firstName} ${formData.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Education Level:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.educationLevel === 'secondary' ? 'Secondary School' : 'University/Higher Institution'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Current School:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.currentSchool}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Scholarship Type:</strong></td>
                  <td style="padding: 8px 0;">${formData.scholarshipType.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f4e79; margin-top: 0;">What Happens Next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #2c5282;">
                <li>Application review by our scholarship committee (2-3 weeks)</li>
                <li>Verification of submitted documents</li>
                <li>Shortlisted candidates will be contacted for interview</li>
                <li>Final selection and notification within 4-6 weeks</li>
              </ul>
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffeaa7;">
              <h3 style="color: #856404; margin-top: 0;">Important Reminders:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #856404;">
                <li>Keep your reference ID safe: <strong>${referenceId}</strong></li>
                <li>Check your email regularly for updates</li>
                <li>Ensure your phone number is always reachable</li>
                <li>Do not submit multiple applications</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <h3 style="color: #2c3e50;">Contact Us</h3>
              <p style="margin: 5px 0;"><strong>Email:</strong> scholarships@danga.org</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
              <p style="margin: 5px 0;"><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #2c3e50; color: white; text-align: center; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px;">
                This is an automated message. Please do not reply to this email.<br>
                If you have any questions, contact us using the information above.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to admin (notification)
    const adminEmailData = {
      from: 'Scholarship System <noreply@danga.org>',
      to: ['admin@danga.org'], // Replace with your admin email
      subject: `New Scholarship Application - ${referenceId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Scholarship Application</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🔔 New Scholarship Application</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Reference: ${referenceId}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Application Summary</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #667eea; margin-top: 0;">Personal Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.firstName} ${formData.lastName}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.email}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.phone}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Date of Birth:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.dateOfBirth}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Gender:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.gender}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Address:</strong></td><td style="padding: 5px 0;">${formData.address}, ${formData.city}</td></tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #667eea; margin-top: 0;">Education Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Level:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.educationLevel}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>School:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.currentSchool}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Course:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.course}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Year:</strong></td><td style="padding: 5px 0;">${formData.yearOfStudy}</td></tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #667eea; margin-top: 0;">Scholarship Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Type:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.scholarshipType}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Amount:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.amountRequested || 'Not specified'}</td></tr>
                <tr><td style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Parent/Guardian:</strong></td><td style="padding: 5px 0; border-bottom: 1px solid #eee;">${formData.parentGuardianName}</td></tr>
                <tr><td style="padding: 5px 0;"><strong>Family Income:</strong></td><td style="padding: 5px 0;">${formData.familyIncome}</td></tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #667eea; margin-top: 0;">Reason for Application</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0; font-style: italic;">${formData.reasonForApplication}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #d4edda; color: #155724; border-radius: 8px; text-align: center;">
              <p style="margin: 0;"><strong>📋 Action Required:</strong> Please review this application in your admin dashboard.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    const [applicantResult, adminResult] = await Promise.allSettled([
      resend.emails.send(applicantEmailData),
      resend.emails.send(adminEmailData)
    ]);

    // Check results
    const results = {
      applicantEmail: applicantResult.status === 'fulfilled' ? 'sent' : 'failed',
      adminEmail: adminResult.status === 'fulfilled' ? 'sent' : 'failed',
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Emails processed',
      results 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}