import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';

// Mock data for loans
interface Loan {
    id: string;
    name: string;
    principal: number;
    balance: number;
    monthlyPayment: number;
}

const mockLoans: Loan[] = [
    { id: '1', name: 'Car Loan', principal: 1000000, balance: 800000, monthlyPayment: 30000 },
    { id: '2', name: 'Student Loan', principal: 2000000, balance: 1800000, monthlyPayment: 50000 },
    { id: '3', name: 'Home Loan', principal: 30000000, balance: 28000000, monthlyPayment: 150000 },
];

const colorPalette = ['#4caf50', '#2196f3', '#f44336', '#ff9800', '#9c27b0']; // Predefined colors

const Dashboard: React.FC = () => {
    const totalDebt = mockLoans.reduce((sum, loan) => sum + loan.balance, 0);

    // Prepare data for the pie chart
    const pieChartData = mockLoans.map((loan, index) => ({
        name: `${loan.name}: ₹${loan.balance.toLocaleString('en-IN')}`,
        balance: loan.balance,
        color: colorPalette[index % colorPalette.length], // Unique color for each slice
        legendFontColor: '#555',
        legendFontSize: 12,
    }));

    return (
        <View style={styles.container}>
            {/* Total Debt Header */}
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Debt</Text>
                <Text style={styles.summaryAmount}>₹{totalDebt.toLocaleString('en-IN')}</Text>
            </View>

            {/* Debt Distribution Section */}
            <Text style={styles.chartTitle}>Debt Distribution</Text>
            <PieChart
                data={pieChartData}
                width={Dimensions.get('window').width - 32} // Full width of the screen with padding
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="balance"
                backgroundColor="transparent"
                paddingLeft="15"
            />

            {/* Loan Details */}
            <FlatList
                data={mockLoans}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => {
                    const paidOffPercentage = 1 - item.balance / item.principal;

                    return (
                        <View style={styles.loanCard}>
                            {/* Loan Name */}
                            <Text style={styles.loanName}>{item.name}</Text>

                            {/* Progress Bar */}
                            <Progress.Bar
                                progress={paidOffPercentage}
                                width={null}
                                height={10}
                                color="#4caf50"
                                unfilledColor="#e0e0e0"
                                borderRadius={5}
                                borderWidth={0}
                                style={styles.progressBar}
                            />

                            {/* Loan Details */}
                            <Text style={styles.loanDetails}>
                                Balance: ₹{item.balance.toLocaleString('en-IN')}
                            </Text>
                            <Text style={styles.loanDetails}>
                                Monthly Payment: ₹{item.monthlyPayment.toLocaleString('en-IN')}
                            </Text>
                            <Text style={styles.paidOffText}>
                                {Math.round(paidOffPercentage * 100)}% Paid Off
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    summaryCard: {
        padding: 16,
        backgroundColor: '#6200ea',
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    summaryTitle: {
        fontSize: 18,
        color: '#ffffff',
    },
    summaryAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 16,
    },
    loanCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    loanName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    loanDetails: {
        fontSize: 14,
        marginTop: 4,
        color: '#555',
    },
    paidOffText: {
        fontSize: 14,
        marginTop: 8,
        color: '#4caf50',
        fontWeight: 'bold',
    },
    progressBar: {
        marginTop: 8,
        marginBottom: 8,
    },
});

export default Dashboard;
