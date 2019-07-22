

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Chip from 'material-ui/Chip';
import SelectProto from 'react-select';
import 'react-select/dist/react-select.css';
import classNames from 'classnames';



class Select extends SelectProto {

  render() {


    const {
      controls,
    } = this.props;

    let valueArray = this.getValueArray(this.props.value);
    let options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
    let isOpen = this.state.isOpen;
    if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
    const focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

    let focusedOption = null;
    if (focusedOptionIndex !== null) {
      focusedOption = this._focusedOption = options[focusedOptionIndex];
    } else {
      focusedOption = this._focusedOption = null;
    }
    let className = classNames('Select', this.props.className, {
      'has-value': valueArray.length,
      'is-clearable': this.props.clearable,
      'is-disabled': this.props.disabled,
      'is-focused': this.state.isFocused,
      'is-loading': this.props.isLoading,
      'is-open': isOpen,
      'is-pseudo-focused': this.state.isPseudoFocused,
      'is-searchable': this.props.searchable,
      'Select--multi': this.props.multi,
      'Select--rtl': this.props.rtl,
      'Select--single': !this.props.multi,
    });

    let removeMessage = null;
    if (this.props.multi &&
      !this.props.disabled &&
      valueArray.length &&
      !this.state.inputValue &&
      this.state.isFocused &&
      this.props.backspaceRemoves) {
      removeMessage = (
        <span id={`${this._instancePrefix}-backspace-remove-message`} className="Select-aria-only" aria-live="assertive">
          {this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])}
        </span>
      );
    }

    return (
      <div ref={ref => this.wrapper = ref}
        className={className}
        style={this.props.wrapperStyle}>
        {this.renderHiddenField(valueArray)}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <div ref={ref => this.control = ref}
            className="Select-control"
            onKeyDown={this.handleKeyDown}
            onMouseDown={this.handleMouseDown}
            onTouchEnd={this.handleTouchEnd}
            onTouchMove={this.handleTouchMove}
            onTouchStart={this.handleTouchStart}
            // onKeyDown={() => {}}
            // onMouseDown={() => {}}
            // onTouchEnd={() => {}}
            // onTouchMove={() => {}}
            // onTouchStart={() => {}}
            style={this.props.style}
          >
            <span className="Select-multi-value-wrapper" id={`${this._instancePrefix}-value`}>
              {this.renderValue(valueArray, isOpen)}
              {this.renderInput(valueArray, focusedOptionIndex)}
            </span>
            {removeMessage}
            {this.renderLoading()}
          </div>

          {controls}

          {this.renderClear()}
          {this.renderArrow()}


        </div>
        {isOpen ? this.renderOuter(options, valueArray, focusedOption) : null}
      </div>
    );
  }

}



class Option extends Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      // onInputKeyDown={event => {

      //   event.preventDefault();
      // }}
      // openOnClick={false}
      // searchable={true}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              onDelete={event => {
                event.preventDefault();
                event.stopPropagation();
                onRemove(value);
              }}
            />
          );
        }

        return <div 
          className="Select-value"
        >{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => {



  return {
    root: {
      flexGrow: 1,
      // height: 200,
      width: "100%",
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
      '.Select-control': {
        display: 'flex',
        alignItems: 'center',
        border: 0,
        height: 'auto',
        background: 'transparent',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      '.Select-multi-value-wrapper': {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
      },
      '.Select--multi .Select-input': {
        margin: 0,
      },
      '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
        padding: 0,
      },
      '.Select.Select--single > .Select-control .Select-value': {
        color: theme.palette.text.primary,
      },
      '.Select-noresults': {
        padding: theme.spacing.unit * 2,
      },
      '.Select-input': {
        display: 'inline-flex !important',
        padding: 0,
        height: 'auto',
      },
      '.Select-input input': {
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'default',
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        margin: 0,
        outline: 0,
      },
      '.Select-placeholder, .Select--single .Select-value': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(16),
        padding: 0,
        whiteSpace: "nowrap",
      },
      '.Select-placeholder': {
        opacity: 0.42,
        color: theme.palette.common.black,
      },
      '.Select-menu-outer': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        position: 'absolute',
        left: 0,
        top: `calc(100% + ${theme.spacing.unit}px)`,
        width: '100%',
        zIndex: 2,
        maxHeight: ITEM_HEIGHT * 4.5,
      },
      '.Select.is-focused:not(.is-open) > .Select-control': {
        boxShadow: 'none',
      },
      '.Select-menu': {
        maxHeight: ITEM_HEIGHT * 4.5,
        overflowY: 'auto',
      },
      '.Select-menu div': {
        boxSizing: 'content-box',
      },
      '.Select-arrow-zone, .Select-clear-zone': {
        color: theme.palette.action.active,
        cursor: 'pointer',
        height: 21,
        width: 21,
        zIndex: 1,
      },
      // Only for screen readers. We can't use display none.
      '.Select-aria-only': {
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        height: 1,
        width: 1,
        margin: -1,
      },
    },
  };
};

class SelectField extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    multiSelect: PropTypes.bool.isRequired,
    suggestions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  static defaultProps = {
    multiSelect: false,
    value: "",
  };

  state = {
    // single: null,
    multi: null,
  };

  handleChangeSingle = value => {

    const {
      onChange,
    } = this.props;

    return onChange ? onChange(value) : false;

    // this.setState({
    //   single,
    // });
  };

  handleChangeMulti = multi => {
    this.setState({
      multi,
    });
  };

  render() {
    const {
      classes,
      multiSelect,
      suggestions,
      value,
      label,
      ...other
    } = this.props;

    const {
      // single, 
      multi
    } = this.state;

    return (
      <div className={classes.root}>

        {label ? <Typography
          color="textSecondary"
        >
          {label}
        </Typography> : null}

        {multiSelect
          ?
          <Input
            fullWidth
            inputComponent={SelectWrapped}
            inputProps={{
              classes,
              value: multi,
              multi: true,
              onChange: this.handleChangeMulti,
              placeholder: 'Select multi-value…',
              instanceId: 'react-select-chip',
              id: 'react-select-chip',
              name: 'react-select-chip',
              simpleValue: true,
              options: suggestions,
            }}
          />
          :
          <Input
            fullWidth
            inputComponent={SelectWrapped}
            inputProps={{
              classes,
              value,
              onChange: this.handleChangeSingle,
              placeholder: 'Select single-value…',
              instanceId: 'react-select-single',
              id: 'react-select-single',
              name: 'react-select-single',
              simpleValue: true,
              options: suggestions,
              ...other,
            }}
          />
        }

      </div>
    );
  }
}


export default withStyles(styles)(props => <SelectField {...props}/>);


