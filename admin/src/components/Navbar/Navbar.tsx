import { Navbar, Group, Code, ScrollArea, createStyles } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons";
import { LinksGroup } from "../Navbar/NavbarLinksGroup";

const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Attendence",
    icon: IconPresentationAnalytics,
    links: [
      { label: "View", link: "/attendence/view" },
      { label: "Add", link: "/attendence/add" },
    ],
  },
  {
    label: "Students",
    icon: IconCalendarStats,
    links: [
      { label: "View", link: "/students/view" },
      { label: "Add", link: "/students/add" },
    ],
  },
  {
    label: "Teachers",
    icon: IconNotes,
    links: [
      { label: "View", link: "/teachers/view" },
      { label: "Add", link: "/teachers/add" },
    ],
  },
  {
    label: "Fees",
    icon: IconFileAnalytics,
    link: "/fees"
  },
  {
    label: "Settings",
    icon: IconAdjustments,
    links: [
      { label: "View Profile", link: "/" },
      { label: "Edit Profile", link: "/" },
    ],
  },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      paddingBottom: 0,
    },

    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  };
});

export function NavbarNested() {
  const { classes, cx } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <div className={classes.navbar}>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

    </div>
  );
}
