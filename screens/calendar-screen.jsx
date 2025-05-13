import { View, Text, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

//tlw überschreiben von LocaleConfig, um Anzeige der Tagesnamen anzupassen
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
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"], //diese Zeile wurde geändert, um Tage nur durch einen Buchstaben, statt durch drei (zb. "Mon") anzuzeigen
  today: "Today",
};

//aktivieren des benutzerdefinierten Settings
LocaleConfig.defaultLocale = "en-custom";

//anlegen von emojis für bestimmte tage
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

//farbzuweisung zu emojis
const iconColors = {
  "happy-outline": "green",
  "sad-outline": "red",
};

export const CalendarScreen = () => {
  return (
    <Calendar
      //Styling von Monatstext und Tagesnamen über theme prop
      theme={{
        "stylesheet.calendar.header": {
          monthText: {
            color: "black",
            fontSize: 50,
            fontWeight: "bold",
            marginTop: 30,
            marginBottom: 30,
          },
          dayHeader: {
            color: "black",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: 30,
          },
        },
      }}
      //mit dayComponent eigene Tagesanzeige erstellt; wenn Tag nicht im aktuellen Monat ist ("disabled") Farbe = grey, sonst schwarz; Icon wird angezeigt; aus emojiMap dem Tag zugewiesen
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
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: 60,
    height: 70,
    justifyContent: "top",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "black",
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  dayText: {
    fontSize: 20,
    marginBottom: 4,
    color: "black",
  },
  todayHighlight: {
    borderTopWidth: 2,
    borderTopColor: "black",
  },
});
