import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
    url: string;
}

export const VerificationEmail = ({
    url,
}: VerificationEmailProps) => (
    <Html>
        <Head />
        <Preview>Verify your email for EduAtlas</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logoSection}>
                    <Heading style={logoText}>EduAtlas</Heading>
                </Section>
                <Heading style={h1}>Verify your email address</Heading>
                <Text style={text}>
                    Thank you for joining EduAtlas! To complete your registration and start exploring scholarships, please verify your email address by clicking the button below.
                </Text>
                <Section style={buttonContainer}>
                    <Button style={button} href={url}>
                        Verify Email
                    </Button>
                </Section>
                <Text style={text}>
                    Alternatively, you can copy and paste this link into your browser:
                </Text>
                <Link href={url} style={link}>
                    {url}
                </Link>
                <Hr style={hr} />
                <Text style={footer}>
                    If you didn't request this email, you can safely ignore it.
                </Text>
                <Text style={footer}>
                    &copy; {new Date().getFullYear()} EduAtlas. All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default VerificationEmail;

const main = {
    backgroundColor: "#f9fafb",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "40px 20px",
    maxWidth: "560px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
};

const logoSection = {
    textAlign: "center" as const,
    marginBottom: "32px",
};

const logoText = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#059669", // emerald-600
    margin: "0",
};

const h1 = {
    color: "#111827",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 24px",
};

const text = {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center" as const,
    margin: "0 0 16px",
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#059669",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "16px 32px",
};

const link = {
    color: "#059669",
    textDecoration: "underline",
    fontSize: "14px",
    textAlign: "center" as const,
    display: "block",
    wordBreak: "break-all" as const,
};

const hr = {
    borderColor: "#e5e7eb",
    margin: "32px 0",
};

const footer = {
    color: "#9ca3af",
    fontSize: "14px",
    textAlign: "center" as const,
    margin: "0 0 8px",
};
