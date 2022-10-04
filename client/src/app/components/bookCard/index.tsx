import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { Marginer } from '../marginer';
import { Button } from '../button';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { SCREENS } from '../responsive';

const CardContainer = styled.div`
  min-height: 4.3em;
  box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
  ${tw`
    // always mobile first approach
    flex
    justify-center
    items-center
    rounded-md
    bg-white
    pt-1
    pb-1
    pr-2
    pl-2
    md:pt-2
    md:pb-2
    md:pl-9
    md:pr-9
  `}
`;

const ItemContainer = styled.div`
  ${tw`
    flex
    relative
  `}
`;

const Icon = styled.span`
  ${tw`
    text-red-500
    fill-current
    text-xs
    md:text-base
    mr-1
    md:mr-3
  `}
`;

// For arrow icons
const SmallIcon = styled.span`
  ${tw`
    text-gray-500
    fill-current
    text-xs
    md:text-base
    ml-1
    cursor-pointer
  `}
`;

const Name = styled.span`
  ${tw`
    text-gray-600
    text-xs
    md:text-sm
    cursor-pointer
    select-none
  `}
`;
// vertical line
const LineSeparator = styled.span`
  width: 2px;
  height: 45%;
  ${tw`
    bg-gray-300
    mr-2
    ml-2
    md:mr-5
    md:ml-5
  `}
`;

const DateCalendar = styled(Calendar)<{ offset?: boolean }>`
  position: absolute;
  max-width: none;
  user-select: none;
  top: 2em;
  left: 0;

  // if offset is true
  ${({ offset }) =>
    offset &&
    css`
      left: -6em;
    `}

  @media (min-width: ${SCREENS.md}) {
    top: 3.5em;
    left: -2em;
  }
`;

export function BookCard() {
  const [startDate, setStartDate] = useState<Date>();
  const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
  const [returnDate, setReturnDate] = useState<Date>();
  const [isReturnCalendarOpen, setReturnCalendarOpen] = useState(false);

  const toggleStartDateCalendar = () => {
    setStartCalendarOpen(!isStartCalendarOpen); // open start calendar
    if (isReturnCalendarOpen) setReturnCalendarOpen(false); // close return calendar
  };

  const toggleReturnDateCalendar = () => {
    setReturnCalendarOpen(!isReturnCalendarOpen); // open return calendar
    if (isStartCalendarOpen) setStartCalendarOpen(false); // close start calendar
  };

  // Auto calendar open and close
  useEffect(() => {
    if (startDate !== undefined) {
      setStartCalendarOpen(!isStartCalendarOpen);
      setReturnCalendarOpen(!isReturnCalendarOpen);
    }
    if (returnDate !== undefined) {
      setStartCalendarOpen(false);
      setReturnCalendarOpen(false);
    }
  }, [startDate, returnDate]);

  return (
    <CardContainer>
      {/* Pick up date */}
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        {/* if start date is not selected */}
        {!startDate && (
          <Name onClick={toggleStartDateCalendar}>Pick Up Date</Name>
        )}
        {/* if start date is selected */}
        {startDate && (
          <Name onClick={toggleStartDateCalendar}>
            {startDate.toLocaleDateString()}
          </Name>
        )}
        <SmallIcon>
          <FontAwesomeIcon
            icon={isStartCalendarOpen ? faCaretUp : faCaretDown}
            onClick={toggleStartDateCalendar}
          />
        </SmallIcon>
        {/* Calendar */}
        {isStartCalendarOpen && (
          <DateCalendar
            value={startDate}
            onChange={setStartDate}
            calendarType="US"
            minDate={new Date()}
          />
        )}
      </ItemContainer>
      <LineSeparator />
      {/* Return date */}
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        {/* if return date is not selected */}
        {!returnDate && (
          <Name onClick={toggleReturnDateCalendar}>Return Date</Name>
        )}
        {/* if return date is selected */}
        {returnDate && (
          <Name onClick={toggleReturnDateCalendar}>
            {returnDate.toLocaleDateString()}
          </Name>
        )}
        <SmallIcon>
          <FontAwesomeIcon
            icon={isReturnCalendarOpen ? faCaretUp : faCaretDown}
            onClick={toggleStartDateCalendar}
          />
        </SmallIcon>
        {/* Calendar */}
        {isReturnCalendarOpen && (
          <DateCalendar
            offset
            value={returnDate}
            onChange={setReturnDate}
            calendarType="US"
            minDate={startDate}
          />
        )}
      </ItemContainer>
      <Marginer direction="horizontal" margin="2em" />
      <Button theme="outlined" text="Book Your Ride" />
    </CardContainer>
  );
}
