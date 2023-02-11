import {render, screen} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import "@testing-library/jest-dom"
import userEvent from "@testing-library/react"
import fetchGames from "../fetchGames"

// Could you write a 

const url = "https://testing.org"
const test = vi.fn()
// vi.mock('../fetchGames.js', () => {
//     return ({
//         name: "Hello"
//     })
// })
fetch =  vi.fn().mockImplementation((url) => {
    Promise.resolve({
        json: () => Promise.resolve({ name: "Faagi Amni"})
    })
})
// fetchGames.mockImplementation("Hello")

// vi.fn('../fetchGames.js', () => {
//     return Promise.resolve({
//         json: () => Promise.resolve({
//             data: [
//                 {
//                     name: "Cyberpunk 2077"
//                 },
//                 {
//                     name: "Grand Turismo
//                 },
//                 {
//                     name: "Apex Legends"
//                 }
//             ]
//         })
//     })
// })
// examples of how to mock a function using Jest in react 
describe.only("test fetchGames", () => {
    it("display cached object", async () => {
        // const games = await fetchGames(url)
        const data = await fetchGames()
        console.log(data)
        // const test = await fetch("url")
        console.log(test)
        expect(data).toBe("Hello")
        // console.log(games)
        // const obj = {
        //     name: "Cyberpunk 2077" 
        // }
        // // expect(games).toHaveProperty(obj)
        // expect(fetchGames).toBeCalled(1)
    })
})

// best matcher to 