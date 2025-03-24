import React from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { isWeb } from '@/utils/platform';

interface OptimizedImageProps extends ImageProps {
  priority?: boolean;
  placeholder?: string;
  blurhash?: string;
}

export function OptimizedImage({
  source,
  style,
  priority = false,
  placeholder,
  blurhash,
  ...rest
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Web-specific props
  const webProps = isWeb ? {
    loading: priority ? 'eager' : 'lazy',
    onLoad: () => setIsLoading(false),
    onError: () => setError(true),
  } : {};

  // Native-specific props
  const nativeProps = !isWeb ? {
    onLoadEnd: () => setIsLoading(false),
    onError: () => setError(true),
  } : {};

  return (
    <View style={[styles.container, style]}>
      {isLoading && placeholder && (
        <Image
          source={{ uri: placeholder }}
          style={[StyleSheet.absoluteFill, styles.placeholder]}
        />
      )}
      
      <Image
        source={source}
        style={[
          StyleSheet.absoluteFill,
          styles.image,
          isLoading && styles.loading,
          error && styles.error
        ]}
        {...webProps}
        {...nativeProps}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#E1E1E1',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
  },
  loading: {
    opacity: 0,
  },
  error: {
    opacity: 0.3,
  },
}); 