import { Chart, registerables } from 'chart.js';
import { useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {
    const chartRef = useRef(null);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            createChart(bands);
        })

        return () => socket.off('current-bands')
    }, [socket])

    const createChart = (bands = []) => {
        Chart.register(...registerables);

        const ctx = document.getElementById('myChart').getContext('2d');

        // Destruir el gráfico anterior si existe
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Crear un nuevo gráfico y guardar la referencia
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band => band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(band => band.votes),
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        stacked: true,
                    }
                }
            }
        });

        // Limpiar el gráfico al desmontar el componente
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }

    return (
        <div>
            <canvas id="myChart"></canvas>
        </div>
    );
};
