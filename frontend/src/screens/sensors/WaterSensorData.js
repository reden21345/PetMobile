import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Header from '../../components/Header';
import baseURL from '../../../assets/common/baseurl';
import axios from 'axios';

const DataTableScreen = () => {
  const [tableHead, setTableHead] = useState(['Water', 'Unit', 'Time']);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/waterlevel-data`);
      const data = response.data;

      if (Array.isArray(data)) {
        // Sort data by timestamp in descending order
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const formattedData = sortedData.map(item => [
          item.waterLevel,
          item.unit,
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

  // Fetch data initially and set up the interval
  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Level History</Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#3498db' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} widthArr={[125, 50, 200]} />
            <Rows data={tableData} textStyle={styles.text} widthArr={[125, 50, 200]} />
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: { textAlign: 'center', fontSize: 24, marginBottom: 20, fontWeight: '700', color: '#3498db' },
  tableContainer: { flex: 1, flexDirection: 'row' },
  head: { height: 40, backgroundColor: '#85c1e9' },
  text: { margin: 6, color: '#000', textAlign: 'center', justifyContent: 'center', fontWeight: '400',}
});

export default DataTableScreen;
