"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"

const QuestionsStepLayout = () => {


  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="info">Account</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="view">View</TabsTrigger>
      </TabsList>
      <TabsContent value="info">Make changes to your account here.</TabsContent>
      <TabsContent value="questions">Change your password here.</TabsContent>
      <TabsContent value="view">View your questions here.</TabsContent>
    </Tabs>
  )
}

export default QuestionsStepLayout