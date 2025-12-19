"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Linkedin } from "lucide-react"
import Image from "next/image"
import { api } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

// Helper function to format image URL
const formatImageUrl = (photo) => {
  if (!photo) return "/placeholder-user.jpg"
  
  // Backend photos are stored as /uploads/photos/filename
  if (photo.startsWith("/uploads/photos/")) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000"
    return `${baseUrl}${photo}`
  }
  
  // Frontend uploads are stored in public folder
  return photo.startsWith("/") ? photo : `/${photo}`
}

export default function BoardPage() {
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await api.getCurrentBoard()
        if (response.success) {
          setBoard(response.data)
        } else {
          setError('Failed to load board data')
        }
      } catch (err) {
        console.error('Error fetching board:', err)
        setError('Error loading board data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBoard()
  }, [])

  if (loading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    )
  }

  if (!board?.members?.length) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">No board members found for the current term.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-12 md:py-16 lg:py-20">
        {board.theme && (
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {board.rotaractYear} Board of Directors
            </h1>
            <h2 className="text-xl text-muted-foreground">
              {board.theme}
            </h2>
            {board.themeDescription && (
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                {board.themeDescription}
              </p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
          {board.members.map((member) => (
            <Card key={member._id} className="group overflow-hidden transition-all hover:shadow-lg h-full flex flex-col text-sm sm:text-base">
              <div className="relative aspect-square w-3/4 mx-auto sm:w-full overflow-hidden rounded-lg">
                <Image
                  src={formatImageUrl(member.user?.photo || member.photo)}
                  alt={`${member.user?.firstName || ''} ${member.user?.lastName || member.name}'s profile`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  priority={false}
                />
              </div>
              <CardContent className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold">
                    {member.user?.firstName ? 
                      `${member.user.firstName} ${member.user.lastName}` : 
                      member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.position}</p>
                  {member.description && (
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  )}
                </div>
                <div className="mt-4 flex space-x-4">
                  {member?.email && (
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.phone && (
                    <a 
                      href={`tel:${member.phone}`} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Phone"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}