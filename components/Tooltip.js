import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import classNames from 'classnames';
import FloatingMenu from '../internal/FloatingMenu';

class Tooltip extends Component {
  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['bottom', 'top']),
    triggerText: PropTypes.string,
    showIcon: PropTypes.bool,
    iconName: PropTypes.string,
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    open: false,
    direction: 'bottom',
    showIcon: true,
    iconName: 'info--glyph',
    iconDescription: 'tooltip',
  };

  state = {
    open: this.props.open,
  };

  componentDidMount() {
    requestAnimationFrame(() => {
      this.getTriggerPosition();
    });
  }

  getTriggerPosition = () => {
    const triggerPosition = this.triggerEl.getBoundingClientRect();
    this.setState({ triggerPosition });
  };

  handleMouse = direction => {
    if (direction === 'over') {
      this.getTriggerPosition();
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    const {
      children,
      className,
      direction,
      triggerText,
      showIcon,
      iconName,
      iconDescription,
      ...other
    } = this.props;

    const tooltipClasses = classNames(
      'bx--tooltip',
      { 'bx--tooltip--shown': this.state.open },
      className
    );

    const menuOffset = { left: 5, top: 10 };

    return (
      <div>
        {showIcon
          ? <div className="bx--tooltip__trigger">
              {triggerText}
              <div
                ref={node => {
                  this.triggerEl = node;
                }}
                onMouseOver={() => this.handleMouse('over')}
                onMouseOut={() => this.handleMouse('out')}
                onFocus={() => this.handleMouse('over')}
                onBlur={() => this.handleMouse('out')}
              >
                <Icon
                  name={iconName}
                  description={iconDescription}
                  tabIndex="0"
                />
              </div>
            </div>
          : <div
              className="bx--tooltip__trigger"
              ref={node => {
                this.triggerEl = node;
              }}
              onMouseOver={() => this.handleMouse('over')}
              onMouseOut={() => this.handleMouse('out')}
              onFocus={() => this.handleMouse('over')}
              onBlur={() => this.handleMouse('out')}
            >
              {triggerText}
            </div>}
        <FloatingMenu
          menuPosition={this.state.triggerPosition}
          menuDirection={direction}
          menuOffset={menuOffset}
        >
          <div
            className={tooltipClasses}
            {...other}
            data-floating-menu-direction={direction}
          >
            {children}
          </div>
        </FloatingMenu>
      </div>
    );
  }
}

export default Tooltip;
