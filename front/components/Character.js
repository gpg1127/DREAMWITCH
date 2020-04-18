import styled from 'styled-components';
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { SAY_RESET } from '../reducers/character';


const Character = () => {
  const { talking } = useSelector(state=>state.character);
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  useEffect(()=>{
    if(talking){
      timeoutRef.current = setTimeout(()=>{
        dispatch({
          type: SAY_RESET
        })
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, [talking]);

  return (
    <>
      <Witch>
        <div>머리</div>
        <div>캐릭터의 모습</div>
        {talking && <Talking><p>{talking}</p></Talking>}
      </Witch>
    </>
  );
};

const Witch = styled.div`
  background-color: purple;
  height: 200px;
  text-align: center;
  position: relative;
`;

const Talking = styled.div`
  width: 100%;
  position: absolute;
  bottom: 65px;
  & p {
    color: ${props => props.theme.purpleDark};
    margin: 0 15px;
    background-color: white;
    border-radius: 20px;
    padding: 13px 0;
    font-family: 'CookieRun-Regular';
    font-size: 12px;
  }
  
`;

export default Character;
