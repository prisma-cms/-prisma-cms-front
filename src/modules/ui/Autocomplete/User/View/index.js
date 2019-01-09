

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';

import Context from "@prisma-cms/context";

// import ViewIcon from "material-ui-icons/RemoveRedEye";

export default class TopicBlogView extends Component {

  static contextType = Context;

  static propTypes = {
    getFilters: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
    label: PropTypes.string,
    helperText: PropTypes.string,
    inputProps: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    label: "Пользователь",
    helperText: "Поиск по имени, логину и емейлу",
  }

  state = {
    opened: false,
  }

  render() {

    const {
      UserLink,
      Autocomplete,
    } = this.context;

    const {
      data: {
        objects,
      },
      value,
      getFilters,
      setFilters,
      label,
      helperText,
      inputProps,
      onClick,
      ...other
    } = this.props;

    const {
      opened,
    } = this.state;

    const {
      search,
    } = getFilters() || {};

    const items = objects && objects.map(n => {

      const {
        fullname,
        username,
      } = n;

      const name = fullname || username;

      return {
        ...n,
        label: name,
      }
    }) || []


    let object = value ? items.find(n => n.id === value) : null;

    /**
     * Если есть id компании и нет введенного значения,
     * то выводим название компании
     */

    let displayValue = (opened && search) || object && object.label || value;

    return <Autocomplete
      inputProps={{
        label,
        helperText,
        ...inputProps,
      }}
      onChange={(event, value) => {
        // console.log("onChange", value);
        // this.setState({
        //   value: value,
        // }, () => {
        //   this.loadData();
        // });

        // onChange && onChange(event, value);
        setFilters({
          search: value && value.trim() || undefined,
        })
      }}
      // onSelect={(value, item) => {
      //   console.log("onSelect", value, item);
      //   // this.loadObjectData(id);
      //   // this.setState({
      //   //   object: item,
      //   // }, () => {
      //   //   // onChange && onChange(item.id);
      //   //   onSelect && onSelect(value, item);
      //   // });
      // }}
      // onDelete={(event) => {
      //   updateObject({
      //     blogID: undefined,
      //   })
      // }}
      items={items}
      value={opened ? (search || "") : displayValue || value || ""}
      onMenuVisibilityChange={opened => {
        //        console.log("onMenuVisibilityChange", opened);

        // if (opened && !items.length) {
        //   this.loadData();
        // }

        this.setState({
          opened,
        });

        // onMenuVisibilityChange && onMenuVisibilityChange(opened);
      }}
      // getItemText={(item) => {

      //   const {
      //     value,
      //     label,
      //   } = item;

      //   return label;
      // }}
      // onSelect={(value, item) => {
      //   console.log("onSelect", value, item);
      //   const {
      //     id,
      //   } = item;
      //   updateObject({
      //     blogID: id || undefined,
      //   })
      // }}
      getItemText={(item) => {
        return <UserLink
          user={item}
          onClick={event => {
            event.preventDefault();

            return onClick ? onClick(event) : null;
          }}
        />;
      }}
      viewElement={!opened && object ?
        <UserLink
          user={object}
          target="_blank"
          size="small"
          showName={false}
        >
          {/* <ViewIcon /> */}
        </UserLink>
        : undefined
      }
      {...other}
    />;
  }

}

