"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, Building, Palette, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import api from "@/lib/api"
import { useClubSettings } from "@/contexts/club-settings-context"

export default function ClubSettingsPage() {
  const { refreshSettings, getLogoSrc: contextGetLogoSrc } = useClubSettings()
  const [settings, setSettings] = useState({
    clubName: "Rotaract Club of AIH",
    parentClubName: "Rotary Club of Chennai Skil City",
    rid: "3233",
    currentRotaractYear: "2025-2026",
    collegeName: "Anand Institute of Higher Technology",
    contactEmail: "rotaractaiht@gmail.com",
    contactPhone: "+91 98765 43210",
    address: "Chennai, Tamil Nadu",
    themeOfYear: "அறம் வழி அறம் வளர்த்து",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.getSettings()
        if (response.data) {
          const data = response.data
          setSettings((prev) => ({
            ...prev,
            clubName: data.clubName ?? prev.clubName ?? "",
            parentClubName: data.parentClubName ?? prev.parentClubName ?? "",
            rid: data.rid ?? prev.rid ?? "3233",
            currentRotaractYear: data.currentRotaractYear ?? prev.currentRotaractYear ?? "2025-2026",
            collegeName: data.collegeName ?? prev.collegeName ?? "",
            contactEmail: data.contactEmail ?? prev.contactEmail ?? "",
            contactPhone: data.contactPhone ?? prev.contactPhone ?? "",
            district: data.district ?? prev.district ?? "",
            address: data.address ?? prev.address ?? "",
            themeOfYear: data.themeOfYear ?? prev.themeOfYear ?? "அறம் வழி அறம் வளர்த்து",
            clubLogo: data.clubLogo ?? prev.clubLogo,
            rotaractLogo: data.rotaractLogo ?? prev.rotaractLogo,
          }))
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = async () => {
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      await api.updateSettings(settings)
      // Refresh global settings so all components update
      await refreshSettings()
      setSuccess("Settings saved successfully!")
    } catch (err) {
      setError(err.message || "Failed to save settings")
    } finally {
      setIsLoading(false)
    }
  }

  const getLogoSrc = (path) => {
    if (!path) return ""
    // Use the context's getLogoSrc function
    return contextGetLogoSrc(path) || ""
  }

  const handleLogoUpload = async (event, fieldName) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")
    setSuccess("")
    setIsUploadingLogo(true)

    try {
      const formData = new FormData()
      formData.append(fieldName, file)

      const response = await api.updateLogos(formData)

      if (response.data) {
        // response.data contains updated logo URLs
        setSettings((prev) => ({
          ...prev,
          clubLogo: response.data.clubLogo ?? prev.clubLogo,
          rotaractLogo: response.data.rotaractLogo ?? prev.rotaractLogo,
          parentClubLogo: response.data.parentClubLogo ?? prev.parentClubLogo,
          collegeLogo: response.data.collegeLogo ?? prev.collegeLogo,
        }))
      }

      // Refresh global settings so all components update
      await refreshSettings()
      setSuccess("Logo updated successfully!")
    } catch (err) {
      console.error("Error uploading logo:", err)
      setError(err.message || "Failed to upload logo")
    } finally {
      setIsUploadingLogo(false)
      // reset the input value so the same file can be selected again if needed
      event.target.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Club Settings</h1>
        <p className="text-muted-foreground">Manage club configuration and branding</p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="border-success bg-success/10">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Building className="mr-2 h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger
            value="branding"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Palette className="mr-2 h-4 w-4" /> Branding
          </TabsTrigger>
          <TabsTrigger
            value="year"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Calendar className="mr-2 h-4 w-4" /> Rotaract Year
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
              <CardDescription>Basic club details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    name="clubName"
                    value={settings.clubName ?? ""}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentClubName">Parent Rotary Club</Label>
                  <Input
                    id="parentClubName"
                    name="parentClubName"
                    value={settings.parentClubName ?? ""}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rid">District</Label>
                  <Input
                    id="rid"
                    name="rid"
                    value={settings.rid ?? ""}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College/Institution Name</Label>
                  <Input
                    id="collegeName"
                    name="collegeName"
                    value={settings.collegeName ?? ""}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={settings.contactEmail ?? ""}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={settings.contactPhone ?? ""}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={settings.address ?? ""}
                  onChange={handleChange}
                  className="bg-secondary border-border"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Club Branding</CardTitle>
              <CardDescription>Logos and visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <Label>Club Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-secondary overflow-hidden">
                      {settings.clubLogo ? (
                        <img
                          src={getLogoSrc(settings.clubLogo)}
                          alt="Club Logo"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                          <span className="text-2xl font-bold text-primary-foreground">R</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        id="clubLogoInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLogoUpload(e, "clubLogo")}
                      />
                      <Button
                        variant="outline"
                        asChild
                        disabled={isUploadingLogo}
                      >
                        <label htmlFor="clubLogoInput" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          {isUploadingLogo ? "Uploading..." : "Upload"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Rotaract Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-secondary overflow-hidden">
                      <img
                        src={
                          settings.rotaractLogo
                            ? getLogoSrc(settings.rotaractLogo)
                            : "/placeholder.svg?height=64&width=64"
                        }
                        alt="Rotaract Logo"
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                    <div>
                      <input
                        id="rotaractLogoInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLogoUpload(e, "rotaractLogo")}
                      />
                      <Button
                        variant="outline"
                        asChild
                        disabled={isUploadingLogo}
                      >
                        <label htmlFor="rotaractLogoInput" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          {isUploadingLogo ? "Uploading..." : "Upload"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="themeOfYear">Theme of the Year</Label>
                <Input
                  id="themeOfYear"
                  name="themeOfYear"
                  value={settings.themeOfYear ?? ""}
                  onChange={handleChange}
                  placeholder="e.g., Service Above Self"
                  className="bg-secondary border-border"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Rotaract Year</CardTitle>
              <CardDescription>Current year settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rotaractYear">Current Rotaract Year</Label>
                <Input
                  id="rotaractYear"
                  name="currentRotaractYear"
                  value={settings.currentRotaractYear ?? ""}
                  onChange={handleChange}
                  placeholder="e.g., 2025-2026"
                  className="bg-secondary border-border max-w-xs"
                />
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <h4 className="font-medium mb-2">Year-End Actions</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Use the Archive section to close the current year, export all data, and start a new Rotaract year.
                </p>
                <Button variant="outline" asChild>
                  <a href="/admin/archive">Go to Archive</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
