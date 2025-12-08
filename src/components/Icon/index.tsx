type IconProps = {
  name: string
  color?: string
  size?: string
  className?: string
  ariaLabel?: string
  path?: string
  strokeColor?: string
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  ariaLabel,
  color = 'currentColor',
  size = '16px',
  path = '/sprite.svg',
  strokeColor = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 120 120'
    fill={color}
    className={className}
    aria-label={ariaLabel}
    stroke={strokeColor}
  >
    <use href={`${path}#icon-${name}`} />
  </svg>
)
export default Icon
