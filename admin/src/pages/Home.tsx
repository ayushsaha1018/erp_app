import { AppShell, Navbar, Header } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "../components/Header/Header";
import { NavbarNested } from "../components/Navbar/Navbar";

function Home() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar height={900} width={{ sm: 300 }} p="md">
          <NavbarNested />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <HeaderMegaMenu />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}

export default Home;
