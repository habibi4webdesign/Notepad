import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { withRouter } from 'react-router';
//styles
import style from './Chart.module.scss';
//hooks
import useGists from 'hooks/useGists';
//UI components
import Button from 'components/Button';

const NOTEPADS_TYPE = 'notepads';
const NOTES_TYPE = 'notes';

const Chart = (props) => {
  const { history } = props;
  const { getNotepadList, notepadListState } = useGists();
  const [notepadCreatedDateForNotesChart, setnotepadCreatedDateForNotesChart] =
    useState([]);
  const [
    notepadCreatedDateForNotpadChart,
    setnotepadCreatedDateForNotpadChart,
  ] = useState([]);

  const [numberOfNotepades, setnumberOfNotepades] = useState([]);
  const [numberOfNotesPerNotepad, setnumberOfNotesPerNotepad] = useState([]);
  const [chartType, setchartType] = useState(null);
  const [notepadPage, setnotepadPage] = useState(1);
  const [notesPage, setnotesPage] = useState(1);

  useEffect(() => {
    getNotepadList(notepadPage);
  }, [notepadPage, getNotepadList]);

  useEffect(() => {
    getNotepadList(notesPage);
  }, [notesPage, getNotepadList]);

  const nextNextNotpadList = (chartType) => {
    setchartType(chartType);
    if (chartType === NOTEPADS_TYPE) {
      setnotepadPage((prenotepadPage) => prenotepadPage + 1);
    } else {
      setnotesPage((prenotesPage) => prenotesPage + 1);
    }
  };

  useEffect(() => {
    if (notepadListState.length) {
      //starting point for generate 5 second time ranges
      let firstNotepadDate = new Date(
        notepadListState[notepadListState.length - 1].created_at,
      );

      let page = chartType === NOTEPADS_TYPE ? notepadPage : notesPage;

      const fiveSecondsTimeRanges = [...Array(8 * page)].map(() => {
        const nextFiveSecond = new Date(
          firstNotepadDate.setSeconds(firstNotepadDate.getSeconds() + 5),
        );

        firstNotepadDate = new Date(nextFiveSecond.getTime());
        return new Date(nextFiveSecond.getTime());
      });

      let notpadsinitialList = notepadListState.reverse();
      const finalNotepadCounts = [];
      const finalNotesPerNotepadCounts = [];

      fiveSecondsTimeRanges.forEach((createdDate) => {
        let numberOfNotepads = 0;
        let numberOfNotes = 0;
        for (const item of notpadsinitialList) {
          if (new Date(item.created_at) <= createdDate) {
            numberOfNotes = numberOfNotes + Object.keys(item.files).length;
            numberOfNotepads++;
          } else {
            break;
          }
        }
        notpadsinitialList = notpadsinitialList.slice(numberOfNotepads);
        finalNotepadCounts.push(numberOfNotepads);
        finalNotesPerNotepadCounts.push(numberOfNotes);
      });

      if (chartType === NOTEPADS_TYPE) {
        setnotepadCreatedDateForNotpadChart(fiveSecondsTimeRanges);

        setnumberOfNotepades((prenumberOfNotepades) => [
          ...prenumberOfNotepades,
          ...finalNotepadCounts,
        ]);
      } else if (chartType === NOTES_TYPE) {
        setnotepadCreatedDateForNotesChart(fiveSecondsTimeRanges);

        setnumberOfNotesPerNotepad((prenumberOfNotesPerNotepad) => [
          ...prenumberOfNotesPerNotepad,
          ...finalNotesPerNotepadCounts,
        ]);
      } else {
        setnotepadCreatedDateForNotpadChart(fiveSecondsTimeRanges);
        setnotepadCreatedDateForNotesChart(fiveSecondsTimeRanges);

        setnumberOfNotepades((prenumberOfNotepades) => [
          ...prenumberOfNotepades,
          ...finalNotepadCounts,
        ]);
        setnumberOfNotesPerNotepad((prenumberOfNotesPerNotepad) => [
          ...prenumberOfNotesPerNotepad,
          ...finalNotesPerNotepadCounts,
        ]);
      }
    }
  }, [notepadListState]);

  //common options between charts
  const options = {
    grid: { top: 25, right: 25, bottom: 50, left: 25 },
    yAxis: {
      type: 'value',
      data: [50, 100, 150, 200, 250, 300],
    },
    tooltip: {
      trigger: 'axis',
    },
  };

  const notepadOptions = {
    ...options,
    xAxis: {
      type: 'category',
      data: notepadCreatedDateForNotpadChart.map(
        (item) =>
          `${item.getHours()}:${item.getMinutes()}:${item.getSeconds()}`,
      ),
    },
    series: [
      {
        data: numberOfNotepades,
        type: 'line',
        smooth: true,
      },
    ],
  };
  const notesOptions = {
    ...options,
    xAxis: {
      type: 'category',
      data: notepadCreatedDateForNotesChart.map(
        (item) =>
          `${item.getHours()}:${item.getMinutes()}:${item.getSeconds()}`,
      ),
    },
    series: [
      {
        data: numberOfNotesPerNotepad,
        type: 'line',
        smooth: true,
      },
    ],
  };
  return (
    <div className={style.root}>
      <Button
        onClick={() => history.push('/notepad')}
        className={`${style.btn} ${style.close}`}
        type="btnDefault"
      >
        Close Stats
      </Button>
      <ReactECharts opts={{ renderer: 'canvas' }} option={notepadOptions} />
      <Button
        onClick={() => nextNextNotpadList(NOTEPADS_TYPE)}
        className={style.btn}
        type="btnDefault"
      >
        Load More
      </Button>
      <ReactECharts opts={{ renderer: 'canvas' }} option={notesOptions} />
      <Button
        onClick={() => nextNextNotpadList(NOTES_TYPE)}
        className={style.btn}
        type="btnDefault"
      >
        Load More
      </Button>
    </div>
  );
};

export default withRouter(Chart);
