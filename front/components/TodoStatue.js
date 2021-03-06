import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {SAY_COMPLETE_TODOS} from '../reducers/character';
import styled from 'styled-components';
import { Button } from './styledComponents/PageComponent';

const TodoStatue = ({onClickWriteHistory}) => {
  const dispatch = useDispatch();
  const { date, clearPercentage, isCleared } = useSelector((state) => state.todo);
  

  useEffect(()=>{
    if(clearPercentage === 100 && isCleared === false){
      dispatch({
        type: SAY_COMPLETE_TODOS
      })
    }
  }, [clearPercentage]);

  return (
    <>
      <TodoStatueBar complete={clearPercentage === 100}>
        <Percentage>
          <p className="topText">{isCleared ? '미션 완료 짝짝짝~' : clearPercentage === 100 ? '달성 완료! 별을 눌러 완료하세요!' : '미션 달성율'}</p>
          <p className="percent">{clearPercentage ? clearPercentage : '0'}%</p>
        </Percentage>
        {(clearPercentage === 100 && !isCleared ) ? 
            <StarButtonActive onClick={onClickWriteHistory}>완료버튼</StarButtonActive> :
            <><StarBase><StarPercentage opacity={clearPercentage+'%'} cleared={isCleared}/></StarBase></>
        }
      </TodoStatueBar>
    </>
  );
};

const TodoStatueBar = styled.div`
  position: fixed;
  width: 100%;
  height: ${props => props.complete ? '110px' : '100px'};
  bottom: 0;
  left: 0;
  border-radius: 20px 20px 0 0;
  background-color: ${props => props.complete ? props.theme.purpleDark : props.theme.purpleMedium};
  display: flex;
  transition: all .5s ease;
`;

const Percentage = styled.div`
  flex: 1;
  margin: 25px 0 0 14px;
  & .topText {
    color: white;
    margin-bottom: 8px; 
  }
  & .percent {
    color: ${props => props.theme.yellowMedium};
    font-size: 40px;
  }
`;

const StarBase = styled.button`
  width: 70px;
  height: 70px;
  margin: 15px;
  background: url('/static/icons/stat_basic_no_move.svg');
  outline: none;
  border: 0;
  position: relative;
`;

const StarPercentage = styled(StarBase)`
  background: ${props => props.cleared ? "url('/static/icons/stat_finished.svg')": "url('/static/icons/stat_star.svg')"};
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  opacity: ${props => props.opacity};
`;

const StarButtonActive = styled(StarBase)`
  background: url('/static/icons/stat_click_to_finish.svg');
  text-indent: -9999px;
  cursor: pointer;
`;

export default TodoStatue;
