import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Header from '../../components/Header';
import baseURL from '../../../assets/common/baseurl';
import axios from 'axios';

const DataTableScreen = () => {
  const [tableHead, setTableHead] = useState(['UID', 'Time']);
  const [tableData, setTableData] = useState([]);

  // Fetch data from the backend using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/rfid-data`);
        const data = response.data;

        if (Array.isArray(data)) {
          // Sort data by timestamp in descending order
          const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          const formattedData = sortedData.map(item => [
            item.uid,
            new Date(item.timestamp).toLocaleString(),
          ]);
          setTableData(formattedData);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Pet Feeder Monitoring System" />
      <Text style={styles.title}>Pet Identity History</Text>
      <ScrollView >
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} widthArr={[150, 200]} />
            <Rows data={tableData} textStyle={styles.text} widthArr={[150, 200]} />
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: { textAlign: 'center', fontSize: 24, marginBottom: 20 },
  tableContainer: { flex: 1, flexDirection: 'row' }, // Ensure the table takes full width
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: '#000' } // textStyle is an object
});

export default DataTableScreen;
