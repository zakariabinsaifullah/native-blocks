/* eslint-disable no-useless-escape */
/**
 * WordPress Dependencies
 */
import { InspectorControls, PanelColorSettings, useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, BaseControl, Button, CardDivider } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

// upload and preview component
const MediaUploadPreview = ({ media, onSelect, label, onRemove }) => {
    return (
        <BaseControl label={label}>
            {media?.url ? (
                <div className="media-upload-preview">
                    <img src={media.url} alt={media.alt} className="media-upload-image" />
                    <MediaUpload
                        onSelect={onSelect}
                        allowedTypes={['image']}
                        multiple={false}
                        value={media.id}
                        render={({ open }) => <Button icon="edit" label={__('Edit Image', 'native-blocks')} onClick={open} />}
                    />
                    <Button icon="trash" label={__('Remove Image', 'native-blocks')} onClick={onRemove} />
                </div>
            ) : (
                <MediaUpload
                    onSelect={onSelect}
                    allowedTypes={['image']}
                    multiple={false}
                    value={media?.id}
                    render={({ open }) => <Button icon="upload" label={__('Upload Image', 'native-blocks')} onClick={open} />}
                />
            )}
        </BaseControl>
    );
};

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
        tickerText
    } = attributes;

    // Create CSS custom properties object
    const cssCustomProperties = {
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
    }, []);

    return (
        <Fragment>
            {isSelected && (
                <InspectorControls>
                    <PanelBody>
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
                    </PanelBody>
                    <PanelBody title={__('Poster', 'native-blocks')} initialOpen={false}>
                        <MediaUploadPreview
                            media={posterImage}
                            onSelect={media => {
                                setAttributes({
                                    posterImage: {
                                        url: media.url,
                                        alt: media.alt,
                                        id: media.id
                                    }
                                });
                            }}
                            onRemove={() => setAttributes({ posterImage: null })}
                            label={__('Video Poster', 'native-blocks')}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        title={__('Colors', 'native-blocks')}
                        initialOpen={false}
                        colorSettings={[
                            // {
                            //     value: textColor,
                            //     onChange: color => setAttributes({ textColor: color }),
                            //     label: __('Text', 'native-blocks')
                            // },
                            // {
                            //     value: bgColor,
                            //     onChange: color => setAttributes({ bgColor: color }),
                            //     label: __('Background', 'native-blocks')
                            // }
                        ]}
                    />
                </InspectorControls>
            )}
            <div {...blockProps}>
                <div className='ticker-text'>
                    As of the 7/04/25, our repair prices have increased, ensuring that they reflect the amazing work of our experienced workshop team. Check out our Workshop Pricing here. As of the 7/04/25, our repair prices have increased, ensuring that they reflect the amazing work of our experienced workshop team. Check out our Workshop Pricing here.
                </div>
                <div className='bg-video-wrapper'>
                    {bgVideo && (
                        <video
                            className='bg-video'
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={posterImage?.url}
                        >
                            <source src={bgVideo} type='video/mp4' />
                        </video>
                    )}
                    {posterImage && (
                        <div className='poster-image'>
                            <img src={posterImage.url} alt={posterImage.alt} />
                        </div>
                    )}  
                </div>
                <div className='content-wrapper'>
                    <div className='content'>
                        <RichText
                            tagName={titleTag}
                            className="title"
                            value={ title }
                            onChange={ ( v ) => setAttributes( { title: v } ) }
                            placeholder={__('Enter title...', 'native-blocks')}
                        />
                        <RichText
                            tagName="p"
                            className="description"
                            value={ description }
                            onChange={ ( v ) => setAttributes( { description: v } ) }
                            placeholder={__('Enter description...', 'native-blocks')}
                        />
                        <div className='buttons'>
                            {primaryBtnText && (
                                <a href={primaryBtnUrl} className='primary-btn'>
                                    {primaryBtnText}
                                </a>
                            )}
                            {secondaryBtnText && (
                                <a href={secondaryBtnUrl} className='secondary-btn'>
                                    {secondaryBtnText}
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
