import Section from "@/components/Layouts/Section";
import ChangePassword from "@/components/Settings/ChangePassword";
import GeneralSettings from "@/components/Settings/GeneralSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Settings() {
  return (
    <Section>
      <h1 className="sm:text-3xl text-lg font-bold mt-3 mb-3">
        Admin Settings
      </h1>
      <Tabs defaultValue="security">
        <TabsList>
          <TabsTrigger value="security">Change Password</TabsTrigger>
          <TabsTrigger value="general">General Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="security">
          <ChangePassword />
        </TabsContent>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </Section>
  );
}

export default Settings;
