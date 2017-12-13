import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Bar } from "react-native-pathjs-charts";
import ApiClient from "../../Utils/ApiClient";

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [[{ v: 0, name: "loading" }]]
        };
        this.fetchData();
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Chart",
        headerStyle: { backgroundColor: "#CE563C" },
        headerTitleStyle: { color: "white" }
    });

    fetchData = async () => {
        ApiClient.fetchFoods().then(foods => {
            var copyOfFoods = foods;
            var items = [];
            for (let f of copyOfFoods) {
                console.log(f);
                items.push([{
                    name: f.Name,
                    v: f.Quantity
                }]);
            }
            this.setState({ data: items });
        })
            .catch(function (error) { console.log(error) });
    };

    render() {
        let options = {
            width: 350,
            height: 350,
            margin: {
                top: 30,
                left: 20,
                bottom: 50,
                right: 20
            },
            color: "#e6e6fa",
            gutter: 20,
            animate: {
                type: "oneByOne",
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: "bottom",
                label: {
                    fontFamily: "verdana",
                    fontSize: 8,
                    fontWeight: true,
                    fill: "black",
                    rotate: 45
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: "left",
                label: {
                    fontFamily: "verdana",
                    fontSize: 12,
                    fontWeight: true,
                    fill: "black"
                }
            }
        };

        return (
            <View style={styles.container}>
                <Bar data={this.state.data} options={options} accessorKey="v" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        padding: 20,
        backgroundColor: "#CE563C"
    }
});
