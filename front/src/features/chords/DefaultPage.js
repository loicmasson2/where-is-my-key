import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'

const instrumentPropTypes = PropTypes.shape({
  strings: PropTypes.number.isRequired,
  fretsOnChord: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOf([
    'A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#',
    'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#',
    'G', 'G#', 'Gb'
  ])),
  tunings: PropTypes.shape({
    standard: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
})

const onlyDots = chord =>
  chord.frets
    .map((f, index) => ({ position: index, value: f }))
    .filter(f => !chord.barres || chord.barres.indexOf(f.value) === -1)

export default class DefaultPage extends Component {
  static propTypes = {
    chord: PropTypes.object.isRequired,
    instrument: instrumentPropTypes,
    lite: PropTypes.bool
  };

  static defaultProps = {
    instrument: {
      "strings": 6,
      "fretsOnChord": 4,
      "name": "guitar",
      "numberOfChords": 1919,
      "tunings": {
        "standard": [
          "E2",
          "A2",
          "D3",
          "G3",
          "B3",
          "E4"
        ]
      },
    },
    chord: {
      "frets": [
        -1,
        3,
        2,
        0,
        1,
        0
      ],
      "fingers": [
        0,
        3,
        2,
        0,
        1,
        0
      ],
      "baseFret": 1,
      "barres": [],
      "midi": [
        48,
        52,
        55,
        60,
        64
      ]
    },
  };

  render() {
    const { chord, instrument, lite } = this.props;
    return (
      chord ? <svg
        width='100%'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='xMinYMin meet'
        viewBox='0 0 80 70'>
        <g
          transform='translate(13, 13)'>
          <Neck
            tuning={instrument.tunings.standard}
            strings={instrument.strings}
            frets={chord.frets}
            capo={chord.capo}
            fretsOnChord={instrument.fretsOnChord}
            baseFret={chord.baseFret}
            lite={lite}
          />

          {chord.barres && chord.barres.map((barre, index) =>
            <Barre
              key={index}
              capo={index === 0 && chord.capo}
              barre={barre}
              finger={chord.fingers && chord.fingers[chord.frets.indexOf(barre)]}
              frets={chord.frets}
              lite={lite}
            />)}

          {onlyDots(chord).map(fret => (
            <Dot
              key={fret.position}
              string={instrument.strings - fret.position}
              fret={fret.value}
              strings={instrument.strings}
              finger={chord.fingers && chord.fingers[fret.position]}
              lite={lite}
            />
          ))}
        </g>
      </svg> : null
    );
  }
}
