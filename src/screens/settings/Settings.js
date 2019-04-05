import React, {Component} from 'react'
import {Text} from 'react-native'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  height: 100%;
  background-color: blue;
  justify-content: center;
  align-items: center;
`

export class Settings extends Component {
  render() {
    return (
      <Container>
        <Text>Settings</Text>
      </Container>
    )
  }
}
