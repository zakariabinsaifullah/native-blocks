/* eslint-disable no-useless-escape */
/**
 * WordPress Dependencies
 */
import { InspectorControls, PanelColorSettings, useBlockProps, RichText, MediaUpload, MediaPlaceholder, URLInput,BlockControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, BaseControl, Button, CardDivider, TextControl, ToggleControl,FocalPointPicker,ToolbarGroup,ToolbarButton, ColorIndicator, ColorPalette, ColorPicker } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const {
        photo,
        heading,
        headingTag,
        imgAlt,
        imageRes,
        linkUrl,
        linkTarget,
        fitPosition,
        imageHeight,
        containerRadius,
        blockStyle,
        headingColor

    } = attributes;
    
    const cssCustomProperties = {
        ...(imageHeight && { '--native-image-height': `${imageHeight}px` }),
        ...(containerRadius && { '--native-border-radius': `${containerRadius}px` }),
         ...(headingColor && { '--textColor': headingColor }),

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
    }, [imageHeight, containerRadius,headingColor]);

    return (
        <Fragment>
            {photo && (
                <BlockControls>
                    <ToolbarGroup>
                        <MediaUpload
                            onSelect={(media) => {
                                setAttributes({
                                    photo: {
                                        id: media.id,
                                        url: media.url,
                                        sizes: media.sizes,
                                        alt: media.alt,
                                        caption: media.caption,
                                    },
                                });
                            }}
                            allowedTypes={['image']}
                            value={photo && photo.id}
                            render={({ open }) => (
                                <ToolbarButton
                                    className="components-toolbar__control"
                                    label={__('Edit Image', 'zoloblocks')}
                                    icon="edit"
                                    onClick={open}
                                />
                            )}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}
            
                <InspectorControls  group='settings'>
                    <PanelBody title={__('Image Settings', 'native-blocks')} initialOpen={true}>
                        {photo && photo?.url && (
                            <FocalPointPicker
                                url={photo?.url}
                                value={fitPosition}
                                onChange={v => {
                                    setAttributes({
                                        fitPosition: {
                                            x: v.x,
                                            y: v.y
                                        }
                                    });
                                }}
                            />
                        )}      
                        <RangeControl
                            label={__('Image Height', 'native')}
                            value={imageHeight}
                            onChange={value => setAttributes({ imageHeight: value })}
                            min={50}
                            max={1000}
                            allowReset={true}
                            resetFallbackValue={260}
                        />
                        <RangeControl
                            label={__('Wrapper Radius', 'native')}
                            value={containerRadius}
                            onChange={value => setAttributes({ containerRadius: value })}
                            min={0}
                            max={50}
                        />
                        <SelectControl
                            label={__('Heading Tag', 'native')}
                            value={headingTag}
                            options={[
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' },
                                { label: 'H5', value: 'h5' },
                                { label: 'H6', value: 'h6' }
                            ]}
                            onChange={(value) => setAttributes({ headingTag: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Link Settings', 'native-blocks')} initialOpen={false}>
                        <BaseControl
                            label={__('Link URL', 'native-blocks')}
                            help={__('Add a link to make the image clickable', 'native-blocks')}
                        >
                            <URLInput
                                value={linkUrl}
                                onChange={(url) => setAttributes({ linkUrl: url })}
                                placeholder={__('Enter URL...', 'native-blocks')}
                            />
                        </BaseControl>

                        {linkUrl && (
                            <Fragment>
                                <ToggleControl
                                    label={__('Open in New Tab', 'native-blocks')}
                                    checked={linkTarget === '_blank'}
                                    onChange={(value) => 
                                        setAttributes({ 
                                            linkTarget: value ? '_blank' : '_self',
                                            linkRel: value ? 'noopener noreferrer' : ''
                                        })
                                    }
                                />
                            </Fragment>
                        )}
                    </PanelBody>
                </InspectorControls>
                <InspectorControls group="styles">
                    <PanelBody title={__('text color', 'native-blocks')} initialOpen={false}>
                        <ColorPicker 
                            label={__('Title Color', 'native-blocks')}
                            value={headingColor}
                            onChange={(color) => setAttributes({ headingColor: color })}
                        />
                    </PanelBody>
                </InspectorControls>
                
            
            
            <div {...blockProps}>
                {photo ? (
                    <a 
                        className="native-blocks-image-link"
                    >
                        <div className="native-blocks-image-block-inner">
                            <div className="native-blocks-img-wrap">
                                <img
                                    className="native-blocks-img"
                                    src={photo?.url}
                                    alt={imgAlt}
                                    style={{
                                        objectPosition: `${fitPosition.x * 100}% ${fitPosition.y * 100}%`
                                    }}
                                />
                                <div className="native-blocks-content-overlay">
                                    <div className="native-blocks-inner-content">  
                                        <RichText
                                            tagName={headingTag}
                                            className="native-blocks-heading"
                                            value={heading || ''}
                                            onChange={(v) =>
                                                setAttributes({
                                                    heading: v,
                                                })
                                            }
                                            placeholder={__('Write Title...', 'zoloblocks')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ) : (
                    <div className="native-blocks-media-placeholder">
                        <MediaPlaceholder
                            onSelect={(media) => {
                                setAttributes({
                                    photo: {
                                        id: media.id,
                                        url: media.url,
                                        sizes: media.sizes,
                                        alt: media.alt,
                                        caption: media.caption,
                                    },
                                    imgAlt: media.alt,
                                });
                            }}
                            accept="image/*"
                            onSelectURL={(url) => {
                                setAttributes({
                                    photo: {
                                        url,
                                    },
                                });
                            }}
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Image', 'zoloblocks') }}
                            icon={
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="native-blocks-image-icon"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path
                                        d="M3 17L7.41995 12.58C8.26284 11.7372 9.65125 11.8141 10.3959 12.7449L11.789 14.4863C12.4639 15.3298 13.6866 15.4851 14.5508 14.8369L15.6123 14.0408C16.4086 13.4436 17.5228 13.5228 18.2265 14.2265L21 17M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8ZM5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                                        fill="none"
                                        stroke="#001feb"
                                        strokeWidth="1.4"
                                    ></path>
                                </svg>
                            }
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Edit;