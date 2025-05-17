import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../utils/theme-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

// Teilweise überschreiben von LocaleConfig, um Anzeige der Tagesnamen anzupassen
LocaleConfig.locales["en-custom"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"], // Zeile wurde geändert, um Tage nur durch einen Buchstaben, statt durch drei (zb. "Mon") anzuzeigen
  today: "Today",
};

// Aktivieren des benutzerdefinierten Settings
LocaleConfig.defaultLocale = "en-custom";

// Anlegen von emojis für bestimmte tage
const emojiMap = {
  "2025-05-01": "happy-outline",
  "2025-05-05": "happy-outline",
  "2025-05-21": "happy-outline",
  "2025-05-26": "happy-outline",
  "2025-05-31": "happy-outline",
  "2025-05-02": "sad-outline",
  "2025-05-03": "sad-outline",
  "2025-05-10": "sad-outline",
  "2025-05-13": "sad-outline",
};

//Farbzuweisung zu Emojis
const iconColors = {
  "happy-outline": "green",
  "sad-outline": "red",
};

export const CalendarScreen = () => {
  const { scheme } = useContext(ThemeContext);

  const styles = getStyles(scheme);
  return (
    <View style={styles.screen}>
      <Calendar
        key={scheme}
        // Styling von Monatstext und Tagesnamen über theme prop
        theme={{
          "stylesheet.calendar.header": {
            monthText: {
              color: scheme == "dark" ? "white" : "black",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 30,
              marginBottom: 30,
            },
            dayHeader: {
              color: scheme == "dark" ? "white" : "black",
              backgroundColor: scheme == "dark" ? "#121212" : "#fff",
              fontWeight: "bold",
              fontSize: 20,
            },
          },
          backgroundColor: scheme == "dark" ? "#121212" : "#fff",
          calendarBackground: scheme == "dark" ? "#121212" : "#fff",
        }}
        // Mit dayComponent eigene Tagesanzeige erstellt; wenn Tag nicht im aktuellen Monat ist ("disabled") Farbe = grey, sonst schwarz; Icon wird angezeigt; aus emojiMap dem Tag zugewiesen
        dayComponent={({ date, state }) => {
          const iconName = emojiMap[date.dateString];
          return (
            <View style={[styles.dayContainer]}>
              <Text
                style={[
                  styles.dayText,
                  state === "disabled" && { color: "#ccc" },
                ]}
              >
                {date.day}
              </Text>
              {iconName && (
                <Ionicons
                  name={iconName}
                  size={30}
                  color={iconColors[iconName]}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const getStyles = (scheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: scheme == "dark" ? "#121212" : "#fff",
    },
    dayContainer: {
      width: 60,
      height: 70,
      justifyContent: "top",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: scheme == "dark" ? "#363636" : "#D3D3D3",
      backgroundColor: scheme == "dark" ? "#121212" : "#fff",
      padding: 5,
      margin: 0,
    },
    dayText: {
      fontSize: 20,
      marginBottom: 4,
      color: scheme == "dark" ? "#fff" : "#000",
    },
    todayHighlight: {
      borderTopWidth: 2,
      borderTopColor: scheme == "dark" ? "#fff" : "#000",
    },
  });
