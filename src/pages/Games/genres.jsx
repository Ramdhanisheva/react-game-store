import {
  GiBoxingGlove,
  GiChessKnight,
  GiPistolGun,
  GiCapeArmor,
  GiCheckeredFlag,
  GiSoccerBall,
} from "react-icons/gi";
import { FaPuzzlePiece, FaMountain } from "react-icons/fa";
import React from "react";

const genres = [
  { name: "action", icon: <GiBoxingGlove /> },
  { name: "strategy", icon: <GiChessKnight /> },
  { name: "rpg", icon: <GiCapeArmor /> },
  { name: "shooter", icon: <GiPistolGun /> },
  { name: "adventure", icon: <FaMountain /> },
  { name: "puzzle", icon: <FaPuzzlePiece /> },
  { name: "racing", icon: <GiCheckeredFlag /> },
  { name: "sports", icon: <GiSoccerBall /> },
];

export default genres;
