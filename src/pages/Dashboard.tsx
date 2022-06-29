import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow, IonSpinner } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { errorMessage } from "../services/toastService";
import Chart from 'react-apexcharts';

interface IChartState {
    label: string[];
    value: number[];
}

const Dashboard: React.FC = () => {

    const [dataChart, setDataChart] = useState<IChartState>({ label: [], value: [] });

    const getDataChart = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/dashboard/category`);
            if (response.status === 200) {
                setDataChart(response.data);
            }
        } catch (err) {
            errorMessage(err);
        }
    }

    const chartState = {
        series: dataChart.value,
        options: {
            labels: dataChart.label,
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#373d3f',
                                formatter: function (w: any) {
                                    return w.globals.seriesTotals.reduce((a: any, b: any) => {
                                        return a + b
                                    }, 0)
                                }
                            }
                        }
                    }
                }
            },
        },
    }

    useEffect(() => {
        getDataChart()
    }, [])

    return (
        <IonPage>
            <HeaderAdmin title="Dashboard" />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Chart Category</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {chartState.options !== undefined && chartState.series !== undefined ? <Chart options={chartState.options} series={chartState.series} height={300} type='donut' /> : <IonSpinner name="crescent" />}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Dashboard;