import styled from 'styled-components';
import { Text, View } from "react-native";
import React, { Component } from "react";

// export const Title = styled.Text`
//     font-size: 12px;
//     color: ${props => props.color};
// `

export const Title = styled.Text.attrs(props => ({

    size: props.size || "12px"
}))`
    font-size: ${props => props.size};
    color: #fff;
`

export const DrawerLabel = styled.Text.attrs(props => ({
    size: props.size || "12px",
    color: props.color || "#000"
}))`
    font-size ${props => props.size};
    color: ${props => props.color};
    font-weight: bold;
`
