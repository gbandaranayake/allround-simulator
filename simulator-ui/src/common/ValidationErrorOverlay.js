import React from "react";
import Overlay from "react-bootstrap/Overlay";

const styles = {
    tooltip: {
        position: 'absolute',
        padding: '0 5px'
    },

    inner: {
        padding: '3px 8px',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 3,
        backgroundColor: '#ff0006',
        opacity: 0.75
    },

    arrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        opacity: 0.75
    },

    placement: {
        tooltip: {
            marginLeft: 3,
            padding: '0 5px'
        },

        arrow: {
            borderWidth: '5px 5px 5px 0',
            borderColor: 'transparent #ff0006 transparent transparent'
        }
    }
};

function ValidationErrorOverlay(props) {
    const message = props.message;
    return (
        <Overlay
            show={props.show}
            placement="right"
            container={this}
            target={props.target}
        >
            {({
                  placement,
                  scheduleUpdate,
                  arrowProps,
                  outOfBoundaries,
                  show: _show,
                ...props
              }) => {
                return (
                    <div
                        {...props}
                        style={{
                            ...styles.tooltip,
                            ...styles.placement.tooltip,
                            ...props.style
                        }}
                    >
                        <div
                            {...arrowProps}
                            style={{
                                ...styles.arrow,
                                ...styles.placement.arrow,
                                ...arrowProps.style,
                                left: 'inherit'
                            }}
                        />
                        <div style={{...styles.inner}}>
                            {message}
                        </div>
                    </div>
                );
            }}
        </Overlay>
    );
}

export default ValidationErrorOverlay;