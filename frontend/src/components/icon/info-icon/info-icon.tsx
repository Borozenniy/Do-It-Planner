import { Tooltip } from '../../tooltip/tooltip';
import { TooltipProps } from '../../tooltip/tooltip';

import './info-icon.scss';

type InfoIconProps = {
  titleLabel?: TooltipProps['titleLabel'];
  label: TooltipProps['label'];
  position?: TooltipProps['position'];
};

const InfoIcon = ({
  titleLabel,
  label,
  position = 'bottom',
}: InfoIconProps) => {
  return (
    <Tooltip label={label} titleLabel={titleLabel} position={position}>
      <div className='info-icon'>
        <p>?</p>
      </div>
    </Tooltip>
  );
};

export { InfoIcon };
