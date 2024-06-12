import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://tripadvisor16.p.rapidapi.com/api/v1/rentals/rentalDetails?rentalId=VacationRentalReview-g60763-d24235431-Sonder_The_Industrialist_Queen_Room-New_York_City_New_York";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d499c34b36mshab47685e2bfb9fdp1cc7bajsne8df003f9d26",
          "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
      {data ? (
        <View style={styles.content}>
          <Text style={styles.title}>{data.overview.name}</Text>
          <Text style={styles.price}>
            Price per night: ${data.overview.legacyData.baseDailyRate.amount}{" "}
            {data.overview.legacyData.baseDailyRate.currency}
          </Text>
          <Text style={styles.description}>
            {data.overview.descriptions.overview}
          </Text>
          <Text style={styles.info}>Bathrooms: {data.overview.bathCount}</Text>
          <Text style={styles.info}>
            Rating: {data.overview.averageRatingNumber} stars (
            {data.overview.userReviewCount} reviews)
          </Text>
          <Text style={styles.info}>
            Minimum Stay: {data.overview.minStay} nights
          </Text>
          <Text style={styles.amenities}>Amenities:</Text>
          {data.amenities.map((amenity, index) => (
            <Text key={index} style={styles.amenity}>
              {amenity}
            </Text>
          ))}
          <Text style={styles.imagesTitle}>Photos:</Text>
          {data.photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo.jumboUrl }}
              style={styles.image}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  amenities: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  amenity: {
    fontSize: 16,
    textAlign: "center",
  },
  imagesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 16,
  },
  loading: {
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});

export default App;
