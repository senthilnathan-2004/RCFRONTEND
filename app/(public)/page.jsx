import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Heart, Globe, ArrowRight, Award, Target, Sparkles } from "lucide-react"

export const metadata = {
  title: "Rotaract Club of AIHT | அறம் வழி அறம் வளர்த்து ",
  description:
    "Official website of Rotaract Club of Apollo Institute of Hospital. Building leaders through community service and professional development.",
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container relative px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 border-accent text-accent">
              Rotaract Year 2025–2026
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Rotaract Club of <span className="text-primary">Anand Institute of Higher Technology</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Building future leaders through community service, professional development, and creating lasting change
              in our communities. RID 3233.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/about-club">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Member Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Active Members", value: "50+", icon: Users },
              { label: "Events This Year", value: "25+", icon: Calendar },
              { label: "Service Hours", value: "1000+", icon: Heart },
              { label: "Years of Service", value: "10+", icon: Award },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Purpose</h2>
            <p className="mt-2 text-muted-foreground">அறம் வழி அறம் வளர்த்து</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To develop young professionals and students as leaders in their communities by encouraging high
                  ethical standards, providing opportunities for professional development, and promoting service to
                  others.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <Sparkles className="h-10 w-10 text-accent mb-2" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be a catalyst for positive change in our community by empowering young professionals to take
                  action, build meaningful connections, and create sustainable impact through service and leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Areas of Focus</h2>
            <p className="mt-2 text-muted-foreground">Making a difference in what matters most</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Community Service",
                description: "Local projects addressing community needs and creating lasting impact.",
                icon: Heart,
              },
              {
                title: "Professional Development",
                description: "Workshops, seminars, and networking opportunities for career growth.",
                icon: Award,
              },
              {
                title: "International Service",
                description: "Collaborating with Rotaract clubs worldwide for global initiatives.",
                icon: Globe,
              },
              {
                title: "Club Service",
                description: "Building fellowship and strengthening our club community.",
                icon: Users,
              },

            ].map((area, index) => (
              <Card key={index} className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <area.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="mt-4 text-muted-foreground">
              Be part of a global network of young leaders making a difference. Join Rotaract Club of AIHT and start your
              journey of service and leadership.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/gallery">View Our Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
