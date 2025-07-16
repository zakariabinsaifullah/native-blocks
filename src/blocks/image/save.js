/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

// block save function
const Save = props => {
    const { attributes } = props;
    const { photo, heading, headingTag, imgAlt, linkUrl, linkTarget, fitPosition, blockStyle } = attributes;

    // block props with inline styles for CSS variables
    const blockProps = useBlockProps.save({
        style: blockStyle
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
                    <img
                        className="native-blocks-img"
                        src={photo?.url}
                        alt={imgAlt}
                        style={{
                            objectPosition: `${fitPosition.x * 100}% ${fitPosition.y * 100}%`
                        }}
                    />
                    <div className="overlay-content">
                        <RichText.Content tagName={headingTag} className="native-blocks-heading" value={heading || ''} />
                    </div>
                </a>
            ) : null}
        </div>
    );
};

export default Save;
