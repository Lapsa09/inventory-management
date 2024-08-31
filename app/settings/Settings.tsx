"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserSetting } from "@/types";
import React, { Fragment, useState } from "react";

type Props = {
  settings: UserSetting[];
};

function Settings({ settings }: Props) {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(settings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };
  return (
    <Fragment>
      {userSettings.map((setting, index) => (
        <TableRow className="hover:bg-blue-50 border-none" key={setting.label}>
          <TableCell className="py-2 px-4">{setting.label}</TableCell>
          <TableCell className="py-2 px-4">
            {setting.type === "toggle" ? (
              <Switch
                checked={setting.value as boolean}
                onChange={() => handleToggleChange(index)}
              />
            ) : (
              <Input
                type="text"
                // className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                value={setting.value as string}
                onChange={(e) => {
                  const settingsCopy = [...userSettings];
                  settingsCopy[index].value = e.target.value;
                  setUserSettings(settingsCopy);
                }}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
}

export default Settings;
