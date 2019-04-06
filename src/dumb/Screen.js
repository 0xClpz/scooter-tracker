import {SafeAreaView} from 'react-navigation'
import styled from 'styled-components'

export const Screen = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${props => props.color || 'white'};
  padding: ${props => (props.padding ? '24px' : '0px')};
`
