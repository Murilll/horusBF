// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

var data = [
    {
      "id": "japan",
      "color": "hsl(275, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 278
        },
        {
          "x": "helicopter",
          "y": 134
        },
        {
          "x": "boat",
          "y": 249
        },
        {
          "x": "train",
          "y": 203
        },
        {
          "x": "subway",
          "y": 179
        },
        {
          "x": "bus",
          "y": 216
        },
        {
          "x": "car",
          "y": 184
        },
        {
          "x": "moto",
          "y": 152
        },
        {
          "x": "bicycle",
          "y": 161
        },
        {
          "x": "horse",
          "y": 118
        },
        {
          "x": "skateboard",
          "y": 210
        },
        {
          "x": "others",
          "y": 225
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(30, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 225
        },
        {
          "x": "helicopter",
          "y": 65
        },
        {
          "x": "boat",
          "y": 48
        },
        {
          "x": "train",
          "y": 221
        },
        {
          "x": "subway",
          "y": 115
        },
        {
          "x": "bus",
          "y": 122
        },
        {
          "x": "car",
          "y": 49
        },
        {
          "x": "moto",
          "y": 103
        },
        {
          "x": "bicycle",
          "y": 222
        },
        {
          "x": "horse",
          "y": 107
        },
        {
          "x": "skateboard",
          "y": 63
        },
        {
          "x": "others",
          "y": 144
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(57, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 85
        },
        {
          "x": "helicopter",
          "y": 199
        },
        {
          "x": "boat",
          "y": 201
        },
        {
          "x": "train",
          "y": 153
        },
        {
          "x": "subway",
          "y": 141
        },
        {
          "x": "bus",
          "y": 228
        },
        {
          "x": "car",
          "y": 100
        },
        {
          "x": "moto",
          "y": 70
        },
        {
          "x": "bicycle",
          "y": 118
        },
        {
          "x": "horse",
          "y": 138
        },
        {
          "x": "skateboard",
          "y": 267
        },
        {
          "x": "others",
          "y": 115
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(212, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 279
        },
        {
          "x": "helicopter",
          "y": 64
        },
        {
          "x": "boat",
          "y": 130
        },
        {
          "x": "train",
          "y": 195
        },
        {
          "x": "subway",
          "y": 181
        },
        {
          "x": "bus",
          "y": 172
        },
        {
          "x": "car",
          "y": 257
        },
        {
          "x": "moto",
          "y": 296
        },
        {
          "x": "bicycle",
          "y": 60
        },
        {
          "x": "horse",
          "y": 273
        },
        {
          "x": "skateboard",
          "y": 56
        },
        {
          "x": "others",
          "y": 147
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(257, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 98
        },
        {
          "x": "helicopter",
          "y": 66
        },
        {
          "x": "boat",
          "y": 297
        },
        {
          "x": "train",
          "y": 286
        },
        {
          "x": "subway",
          "y": 72
        },
        {
          "x": "bus",
          "y": 12
        },
        {
          "x": "car",
          "y": 62
        },
        {
          "x": "moto",
          "y": 33
        },
        {
          "x": "bicycle",
          "y": 67
        },
        {
          "x": "horse",
          "y": 233
        },
        {
          "x": "skateboard",
          "y": 107
        },
        {
          "x": "others",
          "y": 189
        }
      ]
    }
  ]

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)