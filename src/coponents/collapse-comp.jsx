import { Collapse } from '@fluentui/react-motion-components-preview';

export const CollapseComp = ({ visible, children }) => {
	return <Collapse visible={visible}>{children}</Collapse>;
};
