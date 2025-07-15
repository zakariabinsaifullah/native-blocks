/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

// block save function
const Save = props => {
    const { attributes } = props;
    const {
        blockStyle,
        bgVideo,
        posterImage,
        title,
        titleTag,
        description,
        primaryBtnText,
        primaryBtnUrl,
        secondaryBtnText,
        secondaryBtnUrl,
        tickerText
    } = attributes;

    /**
     * Block Props
     */
    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            {tickerText && (
                <div className="ticker-text-seamless">
                    <div className="ticker-content">{tickerText}</div>
                    <button id="expand-collapse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                    </button>
                </div>
            )}
            <div className="bg-video-wrapper">
                {bgVideo?.url && (
                    <video className="bg-video" autoPlay loop muted playsInline poster={posterImage?.url}>
                        <source src={bgVideo?.url} type="video/mp4" />
                    </video>
                )}
                {posterImage && (
                    <div className="poster-image">
                        <img src={posterImage.url} alt={posterImage.alt} />
                    </div>
                )}
            </div>
            <div className="content-wrapper">
                <div className="content">
                    <RichText.Content tagName={titleTag} className="title" value={title} />
                    <RichText.Content tagName="p" className="description" value={description} />
                    <div className="buttons">
                        {primaryBtnText && (
                            <a href={primaryBtnUrl} className="primary-btn">
                                {primaryBtnText}
                                <span className="arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                    </svg>
                                </span>
                            </a>
                        )}
                        {secondaryBtnText && (
                            <a href={secondaryBtnUrl} className="secondary-btn">
                                {secondaryBtnText}
                                <span className="arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                    </svg>
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Save;
