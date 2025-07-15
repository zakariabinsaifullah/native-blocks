/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

// block save function
const Save = props => {
    const { attributes } = props;
    const { blockStyle } = attributes;

    /**
     * Block Props
     */
    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            save
        </div>
    );
};

export default Save;
