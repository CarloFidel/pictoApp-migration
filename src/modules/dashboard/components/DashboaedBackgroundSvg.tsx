import { globalStyle } from '@/styles/global.style'
import { StyleSheet, View } from 'react-native'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'

const BASE_COLOR = globalStyle.color.background.light

const MESH_LAYERS = [
  { id: 'meshPurpleTopLeft', cx: '0.16', cy: '0.12', color: '#cadeefdf' },
  { id: 'meshBlueBottom', cx: '0.5', cy: '0.5', color: '#bceee646' },
  { id: 'meshVioletBottom', cx: '0.82', cy: '0.8', color: '#f4dbf646' },
  //{ id: 'meshVioletBottom', cx: '0.82', cy: '0.8', color: '#c3d9eddf' },
] as const

export function DashboaedBackgroundSvg() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          {MESH_LAYERS.map(({ id, cx, cy, color }) => (
            <RadialGradient
              key={id}
              id={id}
              cx={cx}
              cy={cy}
              r="0.78"
              gradientUnits="objectBoundingBox"
            >
              <Stop offset="0" stopColor={color} stopOpacity={1} />
              <Stop offset="0.62" stopColor={color} stopOpacity={0} />
            </RadialGradient>
          ))}
        </Defs>
        <Rect width="100%" height="100%" fill={BASE_COLOR} />
        {MESH_LAYERS.map(({ id }) => (
          <Rect key={`${id}-fill`} width="100%" height="100%" fill={`url(#${id})`} />
        ))}
      </Svg>
    </View>
  )
}
