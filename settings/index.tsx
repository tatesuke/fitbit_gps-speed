
function SettingPage(props) {
  return (
    <Page>
      <Section
        title="Basic Setting">
        <Select
          label={`Unit of spped`}
          settingsKey="sunitOfSpeed"
          options={[
            { name: "km/h" },
            { name: "mph"},
            { name: "kt" },
            { name: "m/s" }
          ]}
        />
        <Toggle
          settingsKey="alwaysScreenOn"
          label="AlwaysScreenOn"
        />
      </Section>
      <Section title="Setting for too slow">
        <Toggle
          settingsKey="showSpeedAsZeo"
          label="Show as speed 0."
        />
        <Toggle
          settingsKey="ShowSpeedAsGray"
          label="Gray out a speed"
        />
        <Toggle
          settingsKey="stopArrow"
          label="Stop update an arrow."
        />
        <Toggle
          settingsKey="showArrowAsGray"
          label="Gray out a arrow"
        />

        <TextInput
          label="Minimum speed"
          settingsKey="minimumSpeed"
          placeholder="Minimum speed"
          type="number"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingPage);
