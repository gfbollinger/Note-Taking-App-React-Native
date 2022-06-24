import React, { useContext } from "react"
import Main from "./Main";
import NoteContext, { NoteProvider } from "./context/NoteContext";
import { ApplicationProvider, IconRegistry, Layout, Icon, Card } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

export default function App() { 
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
      <NoteProvider>
        <Main />
      </NoteProvider>
      </ApplicationProvider>
    </>
  );
}