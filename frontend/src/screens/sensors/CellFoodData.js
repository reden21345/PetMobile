import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Header from '../../components/Header';
import baseURL from '../../../assets/common/baseurl';
import axios from 'axios';

const DataTableScreen = () => {
  const [tableHead, setTableHead] = useState(['Food Weight', 'Unit', 'Time']);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/loadcell-food-data`);
      const data = response.data;

      if (Array.isArray(data)) {
        // Sort data by timestamp in descending order
        const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        const formattedData = sortedData.map(item => [
          item.weight,
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

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Dispense History</Text>
      <ScrollView>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#f39c12'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} widthArr={[100, 80, 195]}/>
            <Rows data={tableData} textStyle={styles.text} widthArr={[100, 80, 195]} />
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', width: '100%' },
  title: { textAlign: 'center', fontSize: 24, marginBottom: 20, fontWeight: '700', color: '#f39c12'  },
  tableContainer: { flex: 1, flexDirection: 'row' },
  head: { height: 40, backgroundColor: '#FFD35A' },
  text: { margin: 6, color: '#000', textAlign: 'center', justifyContent: 'center', fontWeight: '400'} // textStyle is an object
});

export default DataTableScreen;
