import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { ReactNode } from 'react';

interface SectionProps {
    title?: string;
    style?: object;
    children?: ReactNode;
}

const Section = ({ title, style, children }: SectionProps) => {
    const styles = StyleSheet.create({
        section_title: {
            textTransform: 'uppercase',
            color: '#333',
            fontSize: 13,
        },

        section_title_underline: {
            height: 1,
            margin: '2px 0px 4px 0px',
            backgroundColor: '#888',
        },
        section_end: {
            height: 2,
            margin: '10px 0px',
            backgroundColor: '#eee',
        },
    });

    return (
        <View>
            {title && (
                <>
                    <Text style={styles.section_title}>{title}</Text>
                    <View style={styles.section_title_underline}></View>
                </>
            )}

            {children}

            <View style={styles.section_end}></View>
        </View>
    );
};

export default Section;