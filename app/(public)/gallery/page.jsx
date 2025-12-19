"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Blood Donation Camp",
    date: "2025-01-15",
    category: "community_service",
    location: "Apollo Hospital Campus",
    attendees: 120,
    description: "Annual blood donation camp in collaboration with Red Cross",
    images: ["/blood-donation-camp-volunteers.jpg", "/blood-donation-medical-setup.jpg", "/blood-donation-group-photo.jpg"],
  },
  {
    id: 2,
    title: "Leadership Workshop",
    date: "2025-01-10",
    category: "professional_development",
    location: "Conference Hall",
    attendees: 45,
    description: "Interactive workshop on leadership skills for young professionals",
    images: ["/leadership-workshop-presentation.jpg", "/leadership-workshop-participants.jpg"],
  },
  {
    id: 3,
    title: "Tree Plantation Drive",
    date: "2024-12-20",
    category: "community_service",
    location: "City Park",
    attendees: 80,
    description: "Planting 500 saplings for a greener tomorrow",
    images: ["/tree-plantation-volunteers.jpg", "/planting-trees-group-activity.jpg", "/tree-plantation-celebration.jpg"],
  },
  {
    id: 4,
    title: "Installation Ceremony 2025",
    date: "2024-12-01",
    category: "installation",
    location: "Grand Ballroom",
    attendees: 200,
    description: "Formal installation of the new board for Rotaract Year 2025-2026",
    images: [
      "/formal-ceremony-stage-decoration.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  },
  {
    id: 5,
    title: "Health Awareness Camp",
    date: "2024-11-15",
    category: "community_service",
    location: "Rural Health Center",
    attendees: 150,
    description: "Free health checkups and awareness sessions for rural community",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
  {
    id: 6,
    title: "Career Guidance Session",
    date: "2024-11-01",
    category: "professional_development",
    location: "College Auditorium",
    attendees: 100,
    description: "Career guidance for final year students",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
  },
]

const categories = [
  { value: "all", label: "All Events" },
  { value: "community_service", label: "Community Service" },
  { value: "professional_development", label: "Professional Development" },
  { value: "installation", label: "Installation" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredEvents = selectedCategory === "all" ? events : events.filter((e) => e.category === selectedCategory)

  const openLightbox = (event, imageIndex = 0) => {
    setSelectedEvent(event)
    setCurrentImageIndex(imageIndex)
  }

  const closeLightbox = () => {
    setSelectedEvent(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev === selectedEvent.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedEvent.images.length - 1 : prev - 1))
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Events <span className="text-primary">Gallery</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore our journey through service, leadership, and community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container px-4">
          {/* Category Filter */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Events Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-card border-border overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(event)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={event.images[0] || "/placeholder.svg"}
                    alt={event.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-background/80">
                      {event.images.length} photos
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge variant="outline" className="border-primary text-primary mb-2 text-xs">
                      {categories.find((c) => c.value === event.category)?.label}
                    </Badge>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees} attended
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl bg-background p-0 border-border">
          {selectedEvent && (
            <div>
              <div className="relative aspect-video bg-secondary">
                <img
                  src={selectedEvent.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                  className="object-contain w-full h-full"
                />
                {selectedEvent.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {selectedEvent.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedEvent.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedEvent.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedEvent.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {selectedEvent.attendees} attended
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
