/* eslint-disable no-useless-escape */
/**
 * WordPress Dependencies
 */
import { BlockControls, InspectorControls, MediaUpload, PanelColorSettings, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextareaControl, TextControl, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
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
        tickerText,
        height,
        textColor,
        pbtnTextColor,
        pbtnBgColor,
        sbtnTextColor,
        sbtnBgColor
    } = attributes;

    // Create CSS custom properties object
    const cssCustomProperties = {
        ...(height && { '--hero-height': `${height}px` }),
        ...(textColor && { '--text-color': textColor }),
        ...(pbtnTextColor && { '--pbtn-color': pbtnTextColor }),
        ...(pbtnBgColor && { '--pbtn-bg': pbtnBgColor }),
        ...(sbtnTextColor && { '--sbtn-color': sbtnTextColor }),
        ...(sbtnBgColor && { '--sbtn-bg': sbtnBgColor })
    };

    // block props with inline styles for CSS variables
    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    // Update block style attribute when colors/dimensions change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [height, textColor, pbtnTextColor, pbtnBgColor, sbtnTextColor, sbtnBgColor]);

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({
                                bgVideo: media
                            });
                        }}
                        allowedTypes={['video']}
                        multiple={false}
                        value={bgVideo?.id}
                        render={({ open }) => (
                            <ToolbarButton
                                className="components-toolbar__control"
                                label={bgVideo ? __('Change Video', 'native-blocks') : __('Upload Video', 'native-blocks')}
                                icon="video-alt3"
                                onClick={open}
                            />
                        )}
                    />
                    {bgVideo?.url && (
                        <ToolbarButton
                            className="components-toolbar__control"
                            label={__('Remove Video', 'native-blocks')}
                            icon="trash"
                            onClick={() => setAttributes({ bgVideo: null })}
                        />
                    )}
                </ToolbarGroup>
                <ToolbarGroup>
                    <MediaUpload
                        onSelect={media => {
                            setAttributes({
                                posterImage: {
                                    url: media.url,
                                    alt: media.alt,
                                    id: media.id
                                }
                            });
                        }}
                        allowedTypes={['image']}
                        multiple={false}
                        value={posterImage?.id}
                        render={({ open }) => (
                            <ToolbarButton
                                className="components-toolbar__control"
                                label={posterImage?.url ? __('Change Image', 'native-blocks') : __('Upload Image', 'native-blocks')}
                                icon="format-image"
                                onClick={open}
                            />
                        )}
                    />
                    {posterImage?.url && (
                        <ToolbarButton
                            className="components-toolbar__control"
                            label={__('Remove Image', 'native-blocks')}
                            icon="trash"
                            onClick={() => setAttributes({ posterImage: null })}
                        />
                    )}
                </ToolbarGroup>
            </BlockControls>
            {isSelected && (
                <InspectorControls>
                    <PanelBody>
                        <RangeControl
                            label={__('Container Height', 'native-blocks')}
                            value={height}
                            onChange={v => setAttributes({ height: v })}
                            min={100}
                            max={2000}
                            allowReset={true}
                            resetFallbackValue={750}
                        />
                        <SelectControl
                            label={__('Select Title Tag', 'native-blocks')}
                            value={titleTag}
                            options={[
                                { label: __('H1', 'native-blocks'), value: 'h1' },
                                { label: __('H2', 'native-blocks'), value: 'h2' },
                                { label: __('H3', 'native-blocks'), value: 'h3' },
                                { label: __('H4', 'native-blocks'), value: 'h4' },
                                { label: __('H5', 'native-blocks'), value: 'h5' },
                                { label: __('H6', 'native-blocks'), value: 'h6' },
                                { label: __('P', 'native-blocks'), value: 'p' }
                            ]}
                            onChange={value => setAttributes({ titleTag: value })}
                        />
                        <TextareaControl
                            label={__('Ticker Text', 'native-blocks')}
                            value={tickerText}
                            onChange={v =>
                                setAttributes({
                                    tickerText: v
                                })
                            }
                        />
                    </PanelBody>
                    <PanelBody title={__('Primary Button', 'native-blocks')} initialOpen={false}>
                        <TextControl
                            label={__('Text', 'native-blocks')}
                            value={primaryBtnText}
                            onChange={value => setAttributes({ primaryBtnText: value })}
                            placeholder={__('Enter text...', 'native-blocks')}
                        />
                        <TextControl
                            label={__('URL', 'native-blocks')}
                            value={primaryBtnUrl}
                            onChange={value => setAttributes({ primaryBtnUrl: value })}
                            placeholder={__('Enter URL...', 'native-blocks')}
                        />
                    </PanelBody>
                    <PanelBody title={__('Secondary Button', 'native-blocks')} initialOpen={false}>
                        <TextControl
                            label={__('Text', 'native-blocks')}
                            value={secondaryBtnText}
                            onChange={value => setAttributes({ secondaryBtnText: value })}
                            placeholder={__('Enter text...', 'native-blocks')}
                        />
                        <TextControl
                            label={__('URL', 'native-blocks')}
                            value={secondaryBtnUrl}
                            onChange={value => setAttributes({ secondaryBtnUrl: value })}
                            placeholder={__('Enter URL...', 'native-blocks')}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        title={__('Colors', 'native-blocks')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: textColor,
                                onChange: color => setAttributes({ textColor: color }),
                                label: __('Text', 'native-blocks')
                            },
                            {
                                value: pbtnTextColor,
                                onChange: color => setAttributes({ pbtnTextColor: color }),
                                label: __('Primary Button Text', 'native-blocks')
                            },
                            {
                                value: pbtnBgColor,
                                onChange: color => setAttributes({ pbtnBgColor: color }),
                                label: __('Primary Button Background', 'native-blocks')
                            },
                            {
                                value: sbtnTextColor,
                                onChange: color => setAttributes({ sbtnTextColor: color }),
                                label: __('Secondary Button Text', 'native-blocks')
                            },
                            {
                                value: sbtnBgColor,
                                onChange: color => setAttributes({ sbtnBgColor: color }),
                                label: __('Secondary Button Background', 'native-blocks')
                            }
                        ]}
                    />
                </InspectorControls>
            )}
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
                        <RichText
                            tagName={titleTag}
                            className="title"
                            value={title}
                            onChange={v => setAttributes({ title: v })}
                            placeholder={__('Enter title...', 'native-blocks')}
                        />
                        <RichText
                            tagName="p"
                            className="description"
                            value={description}
                            onChange={v => setAttributes({ description: v })}
                            placeholder={__('Enter description...', 'native-blocks')}
                        />
                        <div className="buttons">
                            {primaryBtnText && (
                                <a className="primary-btn">
                                    <RichText
                                        tagName="span"
                                        value={primaryBtnText}
                                        onChange={v => setAttributes({ primaryBtnText: v })}
                                        placeholder={__('Label...', 'native-blocks')}
                                    />
                                    <span className="arrow">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg>
                                    </span>
                                </a>
                            )}
                            {secondaryBtnText && (
                                <a className="secondary-btn">
                                    <RichText
                                        tagName="span"
                                        value={secondaryBtnText}
                                        onChange={v => setAttributes({ secondaryBtnText: v })}
                                        placeholder={__('Label...', 'native-blocks')}
                                    />
                                    <span className="arrow">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg>
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
