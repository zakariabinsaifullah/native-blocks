/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classNames from 'classnames';

// block save function
const Save = (props) => {
    const { attributes } = props;
    const {
        photo,
        heading,
        headingTag,
        imgAlt,
        linkUrl,
        linkTarget,
        fitPosition,
        blockStyle
    } = attributes;

    // block props with inline styles for CSS variables
    const blockProps = useBlockProps.save({
        style: blockStyle,
    });

    return (
        <div {...blockProps}>
            {photo?.url ? (
                <a
                    href={linkUrl || '#'}
                    target={linkTarget}
                    rel={linkTarget === '_blank' ? 'noopener noreferrer' : ''}
                    className="native-blocks-image-link"
                >
                    <div className="native-blocks-image-block-inner">
                        <div className="native-blocks-img-wrap">
                            <img
                                className="native-blocks-img"
                                src={photo?.url}
                                alt={imgAlt || ''}
                                style={{
                                    objectPosition: fitPosition
                                        ? `${fitPosition.x * 100}% ${fitPosition.y * 100}%`
                                        : '50% 50%',
                                }}
                            />
                            <div className="native-blocks-content-overlay">
                                <div className="native-blocks-inner-content">
                                    <RichText.Content
                                        tagName={headingTag || 'h2'}
                                        className="native-blocks-heading"
                                        value={heading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            ) : null}
        </div>
    );
};

export default Save;
